export class field{
    
	primaryKey?
	maxLength?:number | undefined
	minLength?:number | undefined
	choices?: any[] | undefined

	get field() {
		return true
	}
}