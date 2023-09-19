export interface IDropdownItem {
  label: string,
  value: any
}

export interface IUploadEvent {
  originalEvent: Event;
  currentFiles: File[];
}
