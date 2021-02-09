import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListcategorieGenComponent } from './listcomponents/listcategorie-gen/listcategorie-gen.component';
import { ListcategorieMetComponent } from './listcomponents/listcategorie-met/listcategorie-met.component';
import { ListDomainComponent } from './listcomponents/list-domain/list-domain.component';
import { ListRoleComponent } from './listcomponents/list-role/list-role.component';
import { ListPostComponent } from './listcomponents/list-post/list-post.component';
import { ListOperateurComponent } from './listcomponents/list-operateur/list-operateur.component';
import { CategorieGenComponent } from './components/categorie-gen/categorie-gen.component';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import { ListQuestionnaireComponent } from './listcomponents/list-questionnaire/list-questionnaire.component';
import { PassquestionnaireComponent } from './components/passquestionnaire/passquestionnaire.component';
import { AppComponent } from './app.component';
import { ListPasserQuestionnaireComponent } from './listcomponents/list-passer-questionnaire/list-passer-questionnaire.component';
import { ListCompetenceComponent } from './listcomponents/list-competence/list-competence.component';
import { CompetenceComponent } from './components/competence/competence.component';
import { ViewQuestionsComponent } from './listcomponents/view-questions/view-questions.component';
import { PostListComponent } from './listcomponents/post-list/post-list.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {path: 'listcatgen', component: ListcategorieGenComponent},
  {path: 'listcatmet', component: ListcategorieMetComponent},
  {path: 'listDomain', component: ListDomainComponent},
  {path: 'listRole', component: ListRoleComponent},
  {path: 'listpost', component: ListPostComponent},                                        
  {path: 'listeoperateur', component: ListOperateurComponent},
  {path: 'listquestionnaire', component: ListQuestionnaireComponent},
  {path: 'listpassquestionnaire', component: ListPasserQuestionnaireComponent},   
  {path: 'competence', component: CompetenceComponent},
  {path: 'listcompetence', component: ListCompetenceComponent},
  {path: 'viewlistquestions', component: ViewQuestionsComponent},
  {path: 'postList', component: PostListComponent},
  {path: 'home', component: HomeComponent},
  { path: '', redirectTo: '/', pathMatch: 'full' }
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
