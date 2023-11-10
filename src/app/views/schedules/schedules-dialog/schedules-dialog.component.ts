import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { EventImpl } from '@fullcalendar/core/internal';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ConfirmationService } from 'primeng/api';
import { Observable, Subject, debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';

import { SchedulesFacade } from '@core/facades';
import { IBarber, ICustomer, ILabor, ISchedule, IScheduleData, IScheduleForm, IScheduleSuggestion } from '@core/models';

@Component({
  selector: 'app-schedules-dialog',
  templateUrl: './schedules-dialog.component.html',
  styleUrls: ['./schedules-dialog.component.scss']
})
export class SchedulesDialogComponent implements OnInit {
  public formGroup!: FormGroup<IScheduleForm>;
  public editMode!: boolean;
  public schedule?: ISchedule;
  private _visible$ = new Subject<boolean>();
  public visible = false;
  public destroyRef = inject(DestroyRef)
  public customers: ICustomer[] = [];
  public barbers: IBarber[] = [];
  public labors: ILabor[] = [];
  public suggestions: IScheduleSuggestion[] = [];

  constructor(
    private _fb: NonNullableFormBuilder,
    private _confirmationService: ConfirmationService,
    private _schedulesFacade: SchedulesFacade
  ) {}

  get dialogHeader(): string {
    return this.editMode ? 'Editar agendamento' : 'Novo agendamento';
  }

  get titleControl(): FormControl<string> {
    return this.formGroup.controls.title;
  }

  get startControl(): FormControl<Date | null> {
    return this.formGroup.controls.start;
  }

  get endControl(): FormControl<Date | null> {
    return this.formGroup.controls.end;
  }

  get laborsControl(): FormControl<ILabor[]> {
    return this.formGroup.controls.labors;
  }

  public ngOnInit(): void {
    this._initForm();
    this._initFormEvents();
  }

  public open(event?: EventImpl): Observable<boolean> {
    this.editMode = !!event;
    this.visible = true;
    this._loadData(event);
    return this._visible$.asObservable();
  }

  public onClose(changed: boolean): void {
    this.formGroup.reset({ labors: [] });
    this.suggestions = [];
    this.visible = false;
    this._visible$.next(changed);
  }

  public onSave(): void {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.invalid) {
      return;
    }

    const data = this.formGroup.getRawValue() as IScheduleData;
    const request$ = this.editMode
      ? this._schedulesFacade.update(data, this.schedule!.id!)
      : this._schedulesFacade.create(data);

    request$.subscribe({
      next: () => this.onClose(true),
      error: (err) => console.error(err)
    });
  }

  public onDelete(event: Event): void {
    const accept = () => {
      const scheduleId = this.schedule!.id!;
      this._schedulesFacade.delete(scheduleId).subscribe({
        next: () => this.onClose(true),
        error: (err) => console.error(err)
      });
    };

    this._confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Tem certeza que deseja remover o agendamento?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept,
    });
  }

  public defineSuggestion(suggestion: IScheduleSuggestion): void {
    const start = new Date(suggestion.start_time);
    const end = new Date(suggestion.end_time);

    this.startControl.setValue(start, { emitEvent: false });
    this.endControl.setValue(end, { emitEvent: false });
  }

  public disableSuggestion(suggestion: IScheduleSuggestion): boolean {
    const startMatcher = new Date(suggestion.start_time).getTime() === this.startControl.value!.getTime();
    const endMatcher = new Date(suggestion.end_time).getTime() === this.endControl.value!.getTime();

    return startMatcher && endMatcher;
  }

  private _loadData(event?: EventImpl): void {
    this._schedulesFacade.loadDialogData(event).subscribe(([schedule, barbers, customers, labors]) => {
      this.schedule = schedule;
      this.barbers = barbers;
      this.customers = customers;
      this.labors = labors;

      if (!event) {
        return;
      }

      const barberId: string = event.extendedProps['barberId'];
      const customerId: string = event.extendedProps['customerId'];
      const laborIds: string[] = event.extendedProps['laborsIds'];

      this.formGroup.patchValue({
        labors: this.labors.filter(({ id }) => laborIds.includes(id!)),
        customer: this.customers.find(({ id }) => id === customerId),
        barber: this.barbers.find(({ id }) => id === barberId),
        title: schedule.name,
        start: new Date(schedule.start_time),
      });
    });
  }

  private _initForm(): void {
    this.formGroup = this._fb.group<IScheduleForm>({
      title: this._fb.control<string>({ value: '', disabled: true }, [Validators.required]),
      labors: this._fb.control<ILabor[]>([], [Validators.required]),
      barber: this._fb.control<IBarber | null>(null, [Validators.required]),
      customer: this._fb.control<ICustomer | null>(null, [Validators.required]),
      start: this._fb.control<Date | null>(null, [Validators.required]),
      end: this._fb.control<Date | null>({ value: null, disabled: true }),
    });
  }

  private _initFormEvents(): void {
    this.formGroup.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((events) => {
        const { start, labors, barber } = events;
        const title = this._schedulesFacade.formatTitle(barber, labors);
        const end = this._schedulesFacade.calculateEndTime(start, labors);

        this.titleControl.patchValue(title, { emitEvent: false });
        this.endControl.patchValue(end, { emitEvent: false });
      });

    this.formGroup.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef), debounceTime(1000), distinctUntilChanged(),
        filter((events) => !!(events?.barber && events?.start && events?.labors?.length)),
        switchMap((events) => this._schedulesFacade.validate(events as Partial<IScheduleData>, this.schedule?.id))
      )
      .subscribe(({ available, suggestions }) => {
        this.suggestions = suggestions;
        this.startControl.setErrors(available ? null : { unavailable: true });
        this.startControl.markAsTouched();
      });
  }
}
