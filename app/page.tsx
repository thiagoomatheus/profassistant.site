import Image from "next/image"
import Educator from "@/public/images/undraw_educator_re_ju47.svg"
import Link from "next/link"
import ContainerText from "./components/layout/containerText"
import Card from "./components/layout/cardImage"
import Time from "@/public/images/undraw_coffee_time_e8cw-blue.svg"
import Praticity from "@/public/images//undraw_searching_re_3ra9.svg"
import DoYoursef from "@/public/images/undraw_personal_documents_re_vcf2-blue.svg"
import SectionTwoColumns from "./components/layout/sectionTwoColumns"
import First from "@/public/images/Passo 1.gif"
import Second from "@/public/images/Passo 2.gif"
import Third from "@/public/images/Passo 3.gif"
import { plans } from "./(plans)/plans"
import CardPrice from "./components/layout/cardPrice"
import Button from "./components/layout/button"
export default function Home() {
  return (
    <main key={"main"} className="mx-auto w-full p-0 flex flex-col gap-14 md:gap-20 xl:gap-28">
      <section key={"apresentation"} className="grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 self-center max-w-[1440px] self gap-5">
        <ContainerText key={"text_apresentation"} aditionalCSS="lg:text-left lg:max-w-[400px] xl:max-w-lg">
          <h1>Crie questões para seus alunos em segundos</h1>
          <p className="w-5/6">A solução que ajuda você a criar provas e atividades de forma fácil, simples e rápida!</p>
          <Link className="font-bold text-white hover:text-white text-center w-40 lg:w-60 xl:w-80 p-2 cursor-pointer bg-orange hover:bg-blue-2 rounded-2xl shadow-lg duration-200" href={"/register"}>Teste agora</Link>
        </ContainerText>
        <div key={"image_apresentation_box"} className="bg-blue p-5 rounded-lg mx-auto max-w-md md:max-w-none">
          <Image priority key={"image_apresentation"} src={Educator} alt="Professor aplicando prova para alunos" />
        </div>
      </section>
      <section key={"product"} id="produto" className="flex flex-col gap-7 md:gap-10 xl:gap-20 items-center">
        <ContainerText key={"text_product"} aditionalCSS="h-72 xl:h-[400px] md:max-w-sm lg:max-w-2xl reveal-text">
          <h1>A ferramenta que irá te surpreender!</h1>
          <p>Nós sabemos o quanto você professor tem grandes responsabilidades. E junto a isso, surge várias tarefas: preparar aulas, manter cronogramas educacionais atualizados, dar suporte aos alunos, entre muitas outras. Pensando em te ajudar, criamos essa ferramenta incrível que se tornará seu braço direito. Veja o que nossa ferramenta pode te proporcionar:</p>
        </ContainerText>
        <div key={"cards_product"} className="flex flex-col md:flex-row gap-5 lg:gap-10 reveal-card-left">
          <Card key={"card_time"} title="Tempo" img={Time} aditionalCSS="border-[10px] lg:border-[15px] border-orange-2">
            <p>Gere questões em alguns segundos e tenha mais tempo para você.</p>
          </Card>
          <Card key={"card_praticity"} title="Praticidade" img={Praticity} aditionalCSS="border-[10px] lg:border-[15px] border-blue">
            <p>Chega de ficar entrando e saindo de sites, procurando aqui e ali.</p>
          </Card>
          <Card key={"card_do_yoursef"} title="Faça do seu jeito" img={DoYoursef} aditionalCSS="border-[10px] lg:border-[15px] border-orange-2">
            <p>Aqui você pode copiar a questão de forma fácil e montar a sua prova ou atividade.</p>
          </Card>
        </div>
      </section>
      <section key={"how_to_use"} className="flex flex-col gap-5 md:gap-10">
        <h2 className="text-center">Veja como usar:</h2>
        <SectionTwoColumns key={"first"} title="1° - Selecione as informações dos alunos" text="Coloque a série e a idade média dos alunos" img={First} borderColor="orange"/>
        <SectionTwoColumns key={"second"} title="2° - Selecione as informações das questões" text="Coloque a matéria, a quantidade de questões e descreva o assunto" img={Second} borderColor="blue" reverse={true} />
        <SectionTwoColumns key={"third"} title="3° - Clique em “Gerar questão”" text="Agora é so aguardar alguns segundos e seuas questões aparecerão na tela" img={Third} borderColor="orange" />
      </section>
      <section key={"plans"} id="planos" className="flex flex-col gap-7 md:gap-20 xl:gap-28 items-center">
        <h1>Preços e planos:</h1>
        <div key={"cards_plans"} className="flex flex-col justify-center md:grid md:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-10">
          {plans.map(plan => (
            <CardPrice key={`card_${plan.id}`} plan={plan} title={plan.name} price={plan.price}>
                <Button aditionalCSS="dark:bg-orange" key={`button_${plan.id}`} href="/register" text="Escolher" />
            </CardPrice>
          ))}
        </div>
      </section>
      <section key={"about"} id="sobre" className="flex flex-col justify-center items-center gap-5 md:gap-10 text-center">
        <ContainerText key={"text_about"} aditionalCSS="gap-5 md:gap-7 md:max-w-xl xl:max-w-3xl">
          <h1 className="self-center">Sobre nós:</h1>
          <p>O projeto Question! Generator teve seu início em novembro de 2023 nascendo da ideia de facilitar o trabalho dos prefissionais da educação. Seu criador possui professores no círculo familiar e percebia a dificuldade deles em achar questões para suas provas e atividades, que de uma maneira facilitada pudessem organizá-las e remodelá-las.</p>
          <p>Nosso obetivo é ajudar você, professor, a ter essa faceta de seu precioso trabalho simplificada e agilizada, podendo proporcionar a você mais tempo. Nesse projeto, você tem parte crucial, assim, nos esforçamos em proporcionar a ferramenta mais completa para você!</p>
        </ContainerText>
        <h2>Veja o que dizem sobre nós:</h2>
        <div className="flex flex-col md:flex-row gap-5 lg:gap-10">
          <Card key={"card_person1"} title="Raquel" aditionalCSS="border-4 border-blue">
            <p>Perdia muito tempo procurando questões interessantes, mas agora consigo criar questões de forma fácil e rápida</p>
          </Card>
          <Card key={"card_person2"} title="Wanda" aditionalCSS="border-4 border-orange">
            <p>Dou aula para alunos do ensino fundamental e achei o Question! Generator algo que facilita muito a nossa vida</p>
          </Card>
          <Card key={"card_person3"} title="Valquíria" aditionalCSS="border-4 border-blue">
            <p>Achei a ferramenta muito simples e fácil. Agora consigo preparar aulas mais rápido e ainda sobre tempo pra mim</p>
          </Card>
        </div>
      </section>
    </main>
  );
}