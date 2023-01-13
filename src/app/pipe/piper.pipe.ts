import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'piper'
})
export class PiperPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

  setFormat(duration: number){
    let h,m,finalForm;
    h = Math.floor(duration/60);
    m = duration%60;
    finalForm = (h).toString()+":"+(m).toString()
    return finalForm
  }

}
