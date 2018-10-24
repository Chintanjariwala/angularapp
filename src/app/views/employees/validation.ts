export class CustomValidator {

  // Validates US phone numbers
static phoneValidator(number): any {
   if (number.pristine) {
      return null;
   }
   const PHONE_REGEXP = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
   number.markAsTouched();
   if (PHONE_REGEXP.test(number.value)) 
   {
      return null;
   }
   
   return {
      invalidNumber: true
   };
  }
}