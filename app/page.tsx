import Image from "next/image";
import Educator from "@/public/images/undraw_educator_re_ju47.svg"
import Link from "next/link";
import ContainerText from "./components/layout/containerText";
import Card from "./components/layout/card";
import Time from "@/public/images/undraw_coffee_time_e8cw-blue.svg"
import Praticity from "@/public/images//undraw_searching_re_3ra9.svg"
import DoYoursef from "@/public/images/undraw_personal_documents_re_vcf2-blue.svg"
import SectionTwoColumns from "./components/layout/sectionTwoColumns";
import First from "@/public/images/Passo 1.gif"
import Second from "@/public/images/Passo 2.gif"
import Third from "@/public/images/Passo 3.gif"
import { FaCheck, FaX } from "react-icons/fa6";
import { plans } from "./(plans)/plans";

export default function Home() {
  return (
    <main className="mx-auto w-full p-0 flex flex-col gap-14 md:gap-20 xl:gap-28">
      <section className="grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-5">
        <ContainerText aditionalCSS="lg:text-left lg:max-w-[400px] xl:max-w-lg">
          <h1>Crie questões para seus alunos em segundos</h1>
          <p className="w-5/6">A solução que ajuda você a criar provas e atividades de forma fácil, simples e rápida!</p>
          <Link className="font-bold text-white text-center w-40 lg:w-60 xl:w-80 p-2 cursor-pointer bg-orange rounded-2xl shadow-lg" href={""}>Teste agora</Link>
        </ContainerText>
        <div className="bg-blue p-5 rounded-lg mx-auto max-w-md md:max-w-none">
          <Image src={Educator} alt="Professor aplicando prova para alunos" />
        </div>
      </section>
      <section id="product" className="flex flex-col gap-7 md:gap-10 xl:gap-20 items-center">
        <ContainerText aditionalCSS="h-72 xl:h-[400px] md:max-w-sm lg:max-w-2xl">
          <h1>A ferramenta que irá te surpreender!</h1>
          <p>Nós sabemos o quanto você professor tem grandes responsabilidades. E junto a isso, surge várias tarefas: preparar aulas, manter cronogramas educacionais atualizados, dar suporte aos alunos, entre muitas outras. Pensando em te ajudar, criamos essa ferramenta incrível que se tornará seu braço direito. Veja o que nossa ferramenta pode te proporcionar:</p>
        </ContainerText>
        <div className="flex flex-col md:flex-row gap-5 lg:gap-10">
          <Card title="Tempo" img={Time} aditionalCSS="border-[10px] lg:border-[15px] border-orange-2">
            <p>Gere questões em alguns segundos e tenha mais tempo para você.</p>
          </Card>
          <Card title="Praticidade" img={Praticity} aditionalCSS="border-[10px] lg:border-[15px] border-blue-2">
            <p>Chega de ficar entrando e saindo de sites, procurando aqui e ali.</p>
          </Card>
          <Card title="Faça do seu jeito" img={DoYoursef} aditionalCSS="border-[10px] lg:border-[15px] border-orange-2">
            <p>Aqui você pode copiar a questão de forma fácil e montar a sua prova ou atividade.</p>
          </Card>
        </div>
      </section>
      <section className="flex flex-col gap-5 md:gap-10">
        <h2 className="text-center">Veja como usar:</h2>
        <SectionTwoColumns title="1° - Selecione as informações dos alunos" text="Coloque a série e a idade média dos alunos" img={First} borderColor="orange"/>
        <SectionTwoColumns title="2° - Selecione as informações das questões" text="Coloque a matéria, a quantidade de questões e descreva o assunto" img={Second} borderColor="blue" reverse={true} />
        <SectionTwoColumns title="3° - Clique em “Gerar questão”" text="Agora é so aguardar alguns segundos e seuas questões aparecerão na tela" img={Third} borderColor="orange" />
      </section>
      <section id="price" className="flex flex-col gap-7 md:gap-20 xl:gap-28 items-center">
        <h1>Preços e planos:</h1>
        <div className="flex flex-col md:flex-row gap-5 lg:gap-10">
          {plans.map(plan => {
            return (
              <Card key={plan.id} title={plan.name} price={plan.price} aditionalCSS={`${plan.name === "Premium" ? "border-4 border-orange" : "border border-blue"}`}>
                <ul className="flex flex-col gap-2 lg:gap-4">
                  {plan.functionalities.map(feature => {
                    return (
                      <li className="flex flex-row gap-2 items-center text-xs xl:text-base text-left" key={plan.id}><span className={`text-sm xl:text-xl ${feature.active ? "text-green-700" : "text-red-800"}`}>{feature.active ? <FaCheck />: <FaX />}</span>{feature.feature}</li>
                    )
                  })}
                </ul>
              </Card>
            )
          })}
        </div>
      </section>
      <section id="about" className="flex flex-col justify-center items-center gap-5 md:gap-10 text-center">
        <ContainerText aditionalCSS="gap-5 md:gap-7 md:max-w-xl xl:max-w-3xl">
          <h1 className="self-center">Sobre nós:</h1>
          <p>O projeto Question! Generator teve seu início em novembro de 2023 nascendo da ideia de facilitar o trabalho dos prefissionais da educação. Seu criador possui professores no círculo familiar e percebia a dificuldade deles em achar questões para suas provas e atividades, que de uma maneira facilitada pudessem organizá-las e remodelá-las.</p>
          <p>Nosso obetivo é ajudar você, professor, a ter essa faceta de seu precioso trabalho simplificada e agilizada, podendo proporcionar a você mais tempo. Nesse projeto, você tem parte crucial, assim, nos esforçamos em proporcionar a ferramenta mais completa para você!</p>
        </ContainerText>
        <h2>Veja o que dizem sobre nós:</h2>
        <div className="flex flex-col md:flex-row gap-5 lg:gap-10">
          <Card title="Raquel" aditionalCSS="border-4 border-blue">
            <p>Perdia muito tempo procurando questões interessantes, mas agora consigo criar questões de forma fácil e rápida</p>
          </Card>
          <Card title="Wanda" aditionalCSS="border-4 border-orange">
            <p>Dou aula para alunos do ensino fundamental e achei o Question! Generator algo que facilita muito a nossa vida</p>
          </Card>
          <Card title="Valquíria" aditionalCSS="border-4 border-blue">
            <p>Achei a ferramenta muito simples e fácil. Agora consigo preparar aulas mais rápido e ainda sobre tempo pra mim</p>
          </Card>
        </div>
      </section>
    </main>
  );
}