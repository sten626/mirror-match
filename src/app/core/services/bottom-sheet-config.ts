export class BottomSheetConfig<D = any> {
  data?: D | null = null;
  hasBackdrop? = true;
  minHeight?: number | string = '56px';
  width? = '100%';
}
