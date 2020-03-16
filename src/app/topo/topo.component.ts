import { Component, OnInit } from '@angular/core';
import { OfertasService } from 'src/app/ofertas.service';
import { Oferta } from 'src/app/shared/oferta.model';
import { Observable, Subject, of } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.scss'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {
  public ofertas: Observable<Oferta[]>;
  private subjectPesquisa: Subject<string> = new Subject<string>();
  constructor(private ofertasService: OfertasService) {}

  ngOnInit() {
    this.ofertas = this.subjectPesquisa.pipe(
      debounceTime(1000), // Executa ação switchMap depois de 1 segundo
      distinctUntilChanged(), // Para fazer pesquisas distintas
      switchMap((termo: string) => {
        if (termo.trim() === '') {
          return of<Oferta[]>([]);
        }
        return this.ofertasService.pesquisaOfertas(termo);
      }),
      catchError((err: any) => {
        return of<Oferta[]>([]);
      })
    );

    // this.ofertas.subscribe((ofertas: Oferta[]) => {
    //   this.ofertas2 = ofertas;
    // });
  }

  public pesquisa(termoDaBusca: string): void {
    this.subjectPesquisa.next(termoDaBusca);
  }

  public limpaPesquisa(): void {
    this.subjectPesquisa.next('');
  }
}
