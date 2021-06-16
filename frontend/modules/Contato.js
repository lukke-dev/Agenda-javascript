import validator from 'validator';

export default class Contato {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if (!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(e) {
        const el = e.target;
        const firstName = el.querySelector('input[name="nome"]');
        const thisEmail = el.querySelector('input[name="email"]');
        const thisTel = el.querySelector('input[name="telefone"]')
        const div = document.querySelector('.form-errors');
        let error = false;
        div.innerHTML='';
        if (firstName.value.length === 0) {
            error = true;
            let er = document.createElement('p');
            er.className = 'alert alert-danger';
            er.innerHTML = 'Nome é um campo obrigatório';
            div.appendChild(er);
        }

        if (thisEmail.value.length === 0 && thisTel.value.length === 0) {
            error = true;
            let er = document.createElement('p');
            er.className = 'alert alert-danger';
            er.innerHTML = 'Pelo menos um contato precisa ser enviado: e-mail ou telefone';
            div.appendChild(er);
        }
        
        if (!error) el.submit();
    }
}