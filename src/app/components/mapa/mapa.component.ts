import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';

import { Marcador } from '../classes/marcador.class';

import { MapaEditarComponent } from './mapa-editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styles: [`
    agm-map {
      height: 600px;
    }
  `]
})
export class MapaComponent implements OnInit {

  marcadores:Marcador[] = [];

  lat:number = 40.4146500;
  lng:number = -3.7004000;

  constructor(public snackBar: MatSnackBar,
              public dialog: MatDialog) {
    let localSt = localStorage.getItem("marcadores");
    if(localSt){
      this.marcadores = JSON.parse(localSt);
    }
  }

  ngOnInit() {
  }

  agregarMarcador(evento){
    this.marcadores.push(new Marcador(evento.coords.lat, evento.coords.lng));
    this.guardarStorage();
    let snackBarRef = this.snackBar.open('Marcador agregado', 'Cerrar', {duration: 2000});
  }

  borrarMarcador(index:number){
    this.marcadores.splice(index, 1);
    this.guardarStorage();
    let snackBarRef = this.snackBar.open('Marcador borrado', 'Cerrar', {duration: 2000});
  }

  editarMarcador(marcador): void {
    let dialogRef = this.dialog.open(MapaEditarComponent, {
      width: '250px',
      data: { titulo: marcador.titulo, desc: marcador.desc }
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }

  guardarStorage(){
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
  }

}
