import {AbstractControl, ValidatorFn} from '@angular/forms';


export function toStartOfDayInMs(value: Date): number {
    return value.setHours(0, 0, 0, 0);
}

export function toEndOfDayInMs(value: Date): number {
    return value.setHours(23, 59, 59, 999);
}

export function arrayLengthValidator(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;
        if (value && Array.isArray(value)) {
            const length = value.length;
            if (length < min || length > max) {
                return { 'arrayLength': { value } };
            }
        }
        return null;
    };
}

export function convertToCamelCase(snakeCaseString: string): string {
    const words = snakeCaseString.split('_');
    const capitalizedWords = words.map((word, index) => {
        if (index === 0) {
            return word;
        } else {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
    });
    return capitalizedWords.join('');
}

export function convertToSnakeCase(camelCaseString: string): string {
    return camelCaseString.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function convertToCapitalizedSnakeCase(camelCaseString: string): string {
    const snakeCaseString = camelCaseString.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
    return snakeCaseString.charAt(0).toUpperCase() + snakeCaseString.slice(1);
}
