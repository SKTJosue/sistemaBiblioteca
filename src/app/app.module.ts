import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { BadgesComponent } from './components/badges/badges.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { CardsComponent } from './components/cards/cards.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ListGroupComponent } from './components/list-group/list-group.component';
import { ModalComponent } from './components/modal/modal.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ProgressComponent } from './components/progress/progress.component';
import { SpinnersComponent } from './components/spinners/spinners.component';
import { TooltipsComponent } from './components/tooltips/tooltips.component';
import { FormsElementsComponent } from './components/forms-elements/forms-elements.component';
import { FormsLayoutsComponent } from './components/forms-layouts/forms-layouts.component';
import { FormsEditorsComponent } from './components/forms-editors/forms-editors.component';
import { TablesGeneralComponent } from './components/tables-general/tables-general.component';
import { TablesDataComponent } from './components/tables-data/tables-data.component';
import { ChartsChartjsComponent } from './components/charts-chartjs/charts-chartjs.component';
import { ChartsApexchartsComponent } from './components/charts-apexcharts/charts-apexcharts.component';
import { IconsBootstrapComponent } from './components/icons-bootstrap/icons-bootstrap.component';
import { IconsRemixComponent } from './components/icons-remix/icons-remix.component';
import { IconsBoxiconsComponent } from './components/icons-boxicons/icons-boxicons.component';
import { UsersProfileComponent } from './pages/users-profile/users-profile.component';
import { PagesFaqComponent } from './pages/pages-faq/pages-faq.component';
import { PagesContactComponent } from './pages/pages-contact/pages-contact.component';
import { PagesRegisterComponent } from './pages/pages-register/pages-register.component';
import { PagesLoginComponent } from './pages/pages-login/pages-login.component';
import { PagesError404Component } from './pages/pages-error404/pages-error404.component';
import { PagesBlankComponent } from './pages/pages-blank/pages-blank.component';
import { UsuarioCrearComponent } from './components/usuario-crear/usuario-crear.component';
import { UsuariosRegistradosComponent } from './components/usuarios-registrados/usuarios-registrados.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';
import { RegistrarLibroComponent } from './components/registrar-libro/registrar-libro.component';
import {  MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { EditorialComponent } from './components/editorial/editorial.component';
import { RegistroEditorialComponent } from './components/registro-editorial/registro-editorial.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { AutorComponent } from './components/autor/autor.component';
import { RegistroAutorComponent } from './components/registro-autor/registro-autor.component';
import { EstudiantesComponent } from './components/estudiantes./estudiantes..component';
import { RegistroEstudianteComponent } from './components/registro-estudiante/registro-estudiante.component';
import { LibrosRegistradosComponent } from './components/libros-registrados./libros-registrados..component';
import { PagesBuscadorComponent } from './pages/pages-buscador/pages-buscador.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    AlertsComponent,
    AccordionComponent,
    BadgesComponent,
    BreadcrumbsComponent,
    ButtonsComponent,
    CardsComponent,
    CarouselComponent,
    ListGroupComponent,
    ModalComponent,
    TabsComponent,
    PaginationComponent,
    ProgressComponent,
    SpinnersComponent,
    TooltipsComponent,
    FormsElementsComponent,
    FormsLayoutsComponent,
    FormsEditorsComponent,
    TablesGeneralComponent,
    TablesDataComponent,
    ChartsChartjsComponent,
    ChartsApexchartsComponent,
    IconsBootstrapComponent,
    IconsRemixComponent,
    IconsBoxiconsComponent,
    UsersProfileComponent,
    PagesFaqComponent,
    PagesContactComponent,
    PagesRegisterComponent,
    PagesLoginComponent,
    PagesError404Component,
    PagesBlankComponent,
    UsuarioCrearComponent,
    UsuariosRegistradosComponent,
    FilterPipe,
    RegistrarLibroComponent,
    EditorialComponent,
    RegistroEditorialComponent,
    AutorComponent,
    RegistroAutorComponent,
    EstudiantesComponent,
    RegistroEstudianteComponent,
    LibrosRegistradosComponent,
    PagesBuscadorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MultiSelectModule,
    FormsModule,
    NgSelectModule,
    MatIconModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
