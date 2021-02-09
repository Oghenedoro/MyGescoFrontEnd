import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms/';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CategorieMetierComponent } from './components/categorie-metier/categorie-metier.component';
import { CategorieGenComponent } from './components/categorie-gen/categorie-gen.component';
import { ListcategorieGenComponent } from './listcomponents/listcategorie-gen/listcategorie-gen.component';
import { ListcategorieMetComponent } from './listcomponents/listcategorie-met/listcategorie-met.component';
import { ListDomainComponent } from './listcomponents/list-domain/list-domain.component';
import { DomaineComponent } from './components/domaine/domaine.component';
import { ListRoleComponent } from './listcomponents/list-role/list-role.component';
import { ListPostComponent } from './listcomponents/list-post/list-post.component';
import { ListOperateurComponent } from './listcomponents/list-operateur/list-operateur.component';
import { PosteComponent } from './components/poste/poste.component';
import { RoleComponent } from './components/role/role.component';
import { OperateurComponent } from './components/operateur/operateur.component';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import { ListQuestionnaireComponent } from './listcomponents/list-questionnaire/list-questionnaire.component';
import { PassquestionnaireComponent } from './components/passquestionnaire/passquestionnaire.component';
import { ListPasserQuestionnaireComponent } from './listcomponents/list-passer-questionnaire/list-passer-questionnaire.component';
import { from } from 'rxjs';
import { ListCompetenceComponent } from './listcomponents/list-competence/list-competence.component';
import { CompetenceComponent } from './components/competence/competence.component';
import { ViewQuestionsComponent } from './listcomponents/view-questions/view-questions.component';
import { PostListComponent } from './listcomponents/post-list/post-list.component';
import { CreatpostComponent } from './components/creatpost/creatpost.component';
import { HomeComponent } from './components/home/home.component';
import { AutoInterceptor, autoInterceptorProviders } from './jwtHelper/autoIntercepter';


@NgModule({
  declarations: [
    AppComponent,
    CategorieMetierComponent,
    CategorieGenComponent,
    ListcategorieGenComponent,
    ListcategorieMetComponent,
    ListDomainComponent,
    DomaineComponent,
    ListRoleComponent,
    ListPostComponent,
    ListOperateurComponent,
    PosteComponent,
    RoleComponent,
    OperateurComponent,
    QuestionnaireComponent,
    ListQuestionnaireComponent,
    PassquestionnaireComponent,
    ListPasserQuestionnaireComponent,
    ListCompetenceComponent,
    CompetenceComponent,
    ViewQuestionsComponent,
    PostListComponent,
    CreatpostComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    NgxPaginationModule,
    ToastrModule.forRoot()
  ],
  providers: [autoInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
