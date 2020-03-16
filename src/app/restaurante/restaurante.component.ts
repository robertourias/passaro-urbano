import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Oferta } from "../shared/oferta.model";
import { OfertasService } from "../ofertas.service";

@Component({
  selector: "app-restaurante",
  templateUrl: "./restaurante.component.html",
  styleUrls: ["./restaurante.component.scss"],
  providers: [OfertasService]
})
export class RestauranteComponent implements OnInit {
  public ofertas: Oferta[];

  constructor(private ofertasService: OfertasService) {}

  ngOnInit() {
    this.ofertasService
      .getOfertasPorCategoria("restaurante")
      .then((ofertas: Oferta[]) => {
        this.ofertas = ofertas;
      })
      .catch((param: any) => console.log(param));
  }
}
