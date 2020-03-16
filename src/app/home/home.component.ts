import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [OfertasService]
})
export class HomeComponent implements OnInit {
  public ofertas: Oferta[];

  constructor(private ofertaService: OfertasService) {}

  ngOnInit() {
    // this.ofertas = this.ofertaService.getOfertas();
    // console.log(this.ofertas);
    this.ofertaService
      .getOfertas()
      .then((ofertas: Oferta[]) => {
        this.ofertas = ofertas;
        console.log('Then do component que utiliza o serviço!');
      })
      .catch((param: any) => console.log(param));
  }
}
