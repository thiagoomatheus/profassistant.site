'use client';

import { useState } from "react"
import { useChat } from 'ai/react';
import useQuestions from "./lib/useQuestions";
 
export default function Chat() {
  const { messages, setInput, handleSubmit } = useChat({ api: "api/chat"});
  const { separateQuestion } = useQuestions()
  
  const [info, setInfo] = useState({
    ano: "",
    assunto: "",
    idade: "",
    materia: "",
    quantidade: ""
  })

  function handleChange(e:React.ChangeEvent) {
    const target = e.target as HTMLInputElement;
    setInfo({
        ...info,
        [target.name]: target.value
    })
  }
  
  return (
    <main className="mx-auto w-full h-screen p-24 flex flex-col items-center">
      <section className='w-1/2 flex flex-col items-center gap-5'>
        <h1 className='text-2xl font-bold'>Bem vindo ao gerador de questões</h1>
        <form className='w-full flex flex-col gap-3' onSubmit={(e) => {
          e.preventDefault()
          const prompt = `Sou professor do ${info.ano} e preciso gerar ${info.quantidade} questões para uma prova de ${info.materia} sobre ${info.assunto}. Gere questões com 4 alternativas, sendo apenas uma a correta. Indique a correta. Os alunos prossuem ${info.idade} anos. As palavras devem fáceis. Inicie as questões com ---`
          setInput(prompt)
          handleSubmit(e)
        }}>
          <fieldset className='p-2 flex flex-col border border-black gap-3'>
            <legend className='m-2'>Sobre os alunos</legend>
            <label className='flex flex-row gap-2'>Selecione sua série:
              <select onChange={handleChange} className='border border-black' name="ano" defaultValue={"default"} required>
                <option value={"default"} disabled>Selecione uma opção</option>
                <optgroup label='Ensino Fundamental'>
                  <option value="1° ano do ensino fundamental">1° - Ensino Fundamental</option>
                  <option value="2° ano do ensino fundamental">2° - Ensino Fundamental</option>
                  <option value="3° ano do ensino fundamental">3° - Ensino Fundamental</option>
                  <option value="4° ano do ensino fundamental">4° - Ensino Fundamental</option>
                  <option value="5° ano do ensino fundamental">5° - Ensino Fundamental</option>
                  <option value="6° ano do ensino fundamental">6° - Ensino Fundamental</option>
                  <option value="7° ano do ensino fundamental">7° - Ensino Fundamental</option>
                  <option value="8° ano do ensino fundamental">8° - Ensino Fundamental</option>
                  <option value="9° ano do ensino fundamental">9° - Ensino Fundamental</option>
                </optgroup>
                <optgroup label='Ensino Médio'>
                  <option value="1° ano do ensino Médio">1° - Ensino Médio</option>
                  <option value="2° ano do ensino Médio">2° - Ensino Médio</option>
                  <option value="3° ano do ensino Médio">3° - Ensino Médio</option>
                </optgroup>
              </select>
            </label>
            <label className='flex flex-row gap-2'>Idade Média dos alunos:
              <input onChange={handleChange} className='border border-black' type="number" name="idade" min={0} max={22} placeholder="Idade" required />
            </label>
          </fieldset>
          <fieldset className='p-2 flex flex-col border border-black gap-3'>
            <legend className='m-2'>Sobre a prova</legend>
            <label className='flex flex-row gap-2'>Selecione a matéria:
              <select onChange={handleChange} className='border border-black' name="materia" defaultValue={"default"} required>
                <option value={"default"} disabled>Selecione uma opção</option>
                <option value="Artes">Artes</option>
                <option value="Biologia">Biologia</option>
                <option value="Ciências">Ciências</option>
                <option value="Educação Física">Educação Físisca</option>
                <option value="Filosofia">Filosofia</option>
                <option value="Física">Física</option>
                <option value="Geografia">Geografia</option>
                <option value="História">História</option>
                <option value="Inglês">Inglês</option>
                <option value="Matemática">Matemática</option>
                <option value="Português">Português</option>
                <option value="Química">Química</option>
                <option value="Sociologia">Sociologia</option>
              </select>
            </label>
            <label className='flex flex-row gap-2'>Quantidade de questões:
              <select onChange={handleChange} className='border border-black' name="quantidade" defaultValue={"default"} required>
                <option value={"default"} disabled>Selecione uma opção</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </label>
            <label className='flex flex-row gap-2'>Assunto:
              <input onChange={handleChange} className='border border-black' type="text" name="assunto" placeholder="Assunto principal da prova" required />
            </label>
          </fieldset>
          <input className='border border-black cursor-pointer' type="submit" value="Gerar questão" />
        </form>
      </section>
      
      {/* <section>
        {messages.map(m => {
          if (m.role === "user") {
            return
          }
          const questions = m.content.split("---")
          questions.map(q => {
            const question = separateQuestion(q)
            return (
              <div>
                <p>Pergunta: {question.body}</p>
                <p>a&#41; {question.alternativeA}</p>
                <p>b&#41; {question.alternativeB}</p>
                <p>c&#41; {question.alternativeC}</p>
                <p>d&#41; {question.alternativeD}</p>
              </div>
            )
          })
          return ""
        })
        }
      </section> */}

      <section>
        {
          messages.map(m => {
            if (m.role === "user") {
              return
            }
            return m.content
          })
        }
      </section>
    </main>
  );
}