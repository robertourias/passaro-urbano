import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { OfertasService } from "./../ofertas.service";
import { Oferta } from "./../shared/oferta.model";

@Component({
  selector: "app-diversao",
  templateUrl: "./diversao.component.html",
  styleUrls: ["./diversao.component.scss"],
  providers: [OfertasService]
})
export class DiversaoComponent implements OnInit {
  public ofertas: Oferta[];

  constructor(private ofertasService: OfertasService) {}

  ngOnInit() {
    this.ofertasService
      .getOfertasPorCategoria("diversao")
      .then((ofertas: Oferta[]) => {
        this.ofertas = ofertas;
      })
      .catch((param: any) => console.log(param));
  }
}
