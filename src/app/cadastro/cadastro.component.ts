import { ConsultaCepService } from './../service/consulta-cep.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(private router: Router,
      private service: ConsultaCepService) { }

  ngOnInit(): void {
  }

  cadastrar(form: NgForm) {

    if (form.valid) {
      this.router.navigate(['./sucesso'])
    } else {
      alert('Formulario invalido')
    }
    console.log(form.controls)
  }

  consultaCEP(event: any, form: NgForm) {
    const cep = event.target.value

    if (cep !== '') {
      this.service.getConsultaCep(cep).subscribe(result => {
        this.populaEndereco(result, form)
      })
    }
      
  }

  populaEndereco(dados: any, form: NgForm) {
    form.form.patchValue({
      endereco: dados.logradouro,
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf
    })
  }

}
