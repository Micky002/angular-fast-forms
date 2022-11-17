import { Directive, ElementRef, forwardRef, HostListener } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { MAT_INPUT_VALUE_ACCESSOR } from "@angular/material/input";

@Directive({
    selector: 'input[formatIpnut]',
    providers: [{
        provide: MAT_INPUT_VALUE_ACCESSOR,
        useExisting: InputFormatDirective
    }, {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputFormatDirective),
        multi: true
    }]
})
export class InputFormatDirective implements ControlValueAccessor {


    private _value!: string | null;
    private _onChange!: (value: any) => void;

    constructor(private elementRef: ElementRef<HTMLInputElement>) {}


    get value(): string | null {
        console.log('get value: ', this._value);
        
        return this._value;
    }

    @HostListener('blur')
    _onBlur() {
        console.log('blur');
        console.log('value: ', this._value);
        
        this.formatValue(this._value);
    }

    @HostListener('focus')
    _onFocus() {
        this.unformatValue();
    }

    @HostListener('input', ['$event.target.value'])
    onInput(value: any) {
        console.log('onInput: ', value);
        

        this._value = value;
        this._onChange(Number(this._value));
    }

    writeValue(value: string | number | null): void {
        console.log('writeValue: ', value);
        if (typeof value === 'number') {
            
            
            this._value = value.toString();
        } else {
            this._value = value;
        }
        this.formatValue(this._value);
    }

    registerOnChange(fn: any): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: any): void {
    }

    setDisabledState?(isDisabled: boolean): void {

    }

    private formatValue(value: string | null) {
        if (value !== null) {
            const [integer, fraction] = value.split('.');
            
            console.log(integer.length);
            const rest = integer.length % 3
            for(let i = 0; i < integer.length; i = i + 3) {
                console.log(i, i + 3 - rest);
                
            }

            const formatted = integer;
            // console.log(formattedValue);
            this.elementRef.nativeElement.value = value;
        } else {
            this.elementRef.nativeElement.value = '';
        }
    }

    private unformatValue() {
        const value = this.elementRef.nativeElement.value;
        console.log('unformatValue: ', value);
        
        const onlyDecimal = value.replace(new RegExp(`[^${this.decimalSeperator}\\d]`, 'g'), '')
        console.log('onlyDecimal: ', onlyDecimal);
        
        if (value !== null) {
            this.elementRef.nativeElement.value = value;
        } else {
            this.elementRef.nativeElement.value = '';
        }
    }

    private get decimalSeperator(): string {
        return ',';
    }

    private get groupSeperator(): string {
        return '.';
    }
}