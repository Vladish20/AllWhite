$('body').on('input', 'input[type="text"][name="Name"][maxlength]', function(){
	this.value = this.value.replace(/[^a-zа-яё\s]/gi, '');

    if (this.value.length > this.maxLength){
		this.value = this.value.slice(0, this.maxLength);
    }
});

$('body').on('input', 'input[type="text"][name="Surname"][maxlength]', function(){
	this.value = this.value.replace(/[^a-zа-яё\s]/gi, '');

    if (this.value.length > this.maxLength){
		this.value = this.value.slice(0, this.maxLength);
    }
})

$('body').on('input', 'input[type="email"][name="Email"]', function(){
	this.value = this.value.replace(/^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{7,7}\.)?[a-z]{7,7}$/gi, '');

})