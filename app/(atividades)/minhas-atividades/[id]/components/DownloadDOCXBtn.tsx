import Button from "@/app/components/layout/button";
import { Exam } from "@/app/lib/types/types";
import toast from "react-hot-toast";
import { saveAs } from "file-saver";
import { AlignmentType, Document, HeadingLevel, ISectionOptions, ISectionPropertiesOptions, Packer, Paragraph, SectionType, TextRun } from "docx";

function DocumentCreator(exam:Exam) {

  const propertiesDefault: ISectionPropertiesOptions = {
    type: SectionType.CONTINUOUS,
    page: {
      margin: {
        top: "1cm",
        right: "1cm",
        bottom: "1cm",
        left: "1cm",
      },
      size: {
        width: "210mm",
      }
    }
  }

  const header: Paragraph[] = [
    new Paragraph({
      text: `${exam.title} - ${exam.subject}`,
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: `${exam.school_name}`,
          allCaps: exam.uppercase
        }
      )]
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "Professora: ",
          bold: true,
          allCaps: exam.uppercase
        }),
        new TextRun({
          text: `${exam.teacher}`,
          allCaps: exam.uppercase
        })
      ],
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "Nome:  __________________________________________________________  ",
          bold: true,
          allCaps: exam.uppercase
        }),
        new TextRun({
          text: `${exam.grade}:  _______`,
          bold: true,
          allCaps: exam.uppercase
        })
      ],
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: `${exam.obs || ""}`,
          allCaps: exam.uppercase,
          bold: true
        })
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 300 }
    })
  ]

const questionsSection: ISectionOptions[] = []

exam.questions.forEach((question) => {

  const section: {
    properties: ISectionPropertiesOptions,
    children: Paragraph[]
  } = {
    properties: {
      ...propertiesDefault,
      column: {
        count: question.layout === "math_expressions" ? 2 : 1,
        space: 200,
      },
    },
    children: []
  }

  const createParagraphs = (text: string, addPosition: boolean = true, iddentation: boolean = false) => {
    text.split("\n")
    .filter((paragraph) => paragraph.trim() !== "")
    .filter((paragraph) => !paragraph.includes("Resposta"))
    .forEach((paragraph, i) => {
      section.children.push(new Paragraph({
        children: [
          new TextRun({
            text: addPosition && i === 0 ? `${question.position || ""}) ${paragraph}` : paragraph,
            allCaps: question.uppercase,
          })
        ],
        indent: iddentation ? { firstLine: 550 } : undefined
      }));
    });
  };

  switch (question.layout) {
    case "support":
      
      const [supportText, ...supportParagraphs] = question.support?.split("Texto:") || [];

      if (supportText) {
          section.children.push(new Paragraph({
            children: [
              new TextRun({
                text: supportText.replaceAll("\n", ""),
                bold: true,
                allCaps: question.uppercase
              })
            ],
          }));
          section.children.push(new Paragraph({text: ""}));
      }

      supportParagraphs.forEach(p => createParagraphs(p, false, true));

      section.children.push(new Paragraph({text: ""}));

      createParagraphs(question.question!);

      question.number_of_lines > 0 &&
      new Array(question.number_of_lines).fill(null).forEach(() =>
        section.children.push(new Paragraph({ text: question.show_lines ? "________________________________________________________________________________" : ""}))
      );
      section.children.push(new Paragraph({text: ""}));
      break;
    case "math_expressions":
      questionsSection.push({
        properties: propertiesDefault,
        children: [
          new Paragraph({
            text: `${question.position}) Resolva as expressões matemáticas a seguir:`,
            spacing: { after: 300 }
          })
        ]
      });
      question.question!
      .replaceAll("--", "")
      .split("\n")
      .filter((paragraph) => paragraph.trim() !== "")
      .forEach((paragraph) => {
        section.children.push(new Paragraph({ text: paragraph + " =" }))
        question.number_of_lines > 0 &&
        new Array(question.number_of_lines).fill(null).forEach(() =>
          section.children.push(new Paragraph({ text: question.show_lines ? "_______________________________________" : "" }))
        )
      }
      );
      break;
    default:
      createParagraphs(question.question!);
      question.number_of_lines > 0 &&
      new Array(question.number_of_lines).fill(null).forEach(() =>
        section.children.push(new Paragraph({ text: question.show_lines ? "________________________________________________________________________________" : ""}))
      );
      section.children.push(new Paragraph({text: ""}));
      break;
    }
    questionsSection.push(section);
    question.layout === "math_expressions" && 
    questionsSection.push({
      properties: propertiesDefault,
      children: [
        new Paragraph({
          text: "",
        })
      ]
    });
  });

  const doc = new Document({
    styles: {
      default: {
        heading1: {
          run: {
            size: 36,
            bold: true,
            color: "000000",
            allCaps: exam.uppercase,
            font: "Helvetica"
          },
          paragraph: {
            alignment: AlignmentType.CENTER,
            spacing: {
              line: 450,
              after: 250
            }
          },
        },
        document: {
          run: {
            size: 24,
            font: "Helvetica",
            color: "000000",
          },
          paragraph: {
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
              line: 300,
              after: 200
            },
          },
        }
      },
    },
    sections: [
      {
        properties: propertiesDefault,
        children: [
          ...header
        ]
      },
      ...questionsSection
    ],
  })

  return doc
}

export default function DowloadDOCXBtn( { exam }: { exam: Exam } ) {

  async function GenerateDocx(exam: Exam) {

      const toastId = toast.loading(`Gerando...`)

      const doc = DocumentCreator(exam)
      
      try {
        Packer.toBlob(doc).then(blob => {
          saveAs(blob, `${exam.title}.docx`)
        })
        return toast.success("Arquivo gerado com sucesso! Escolha onde irá salvar...", {id: toastId})
      } catch (error) {
        return toast.error("Erro ao gerar arquivo. Tente novamente mais tarde!", {id: toastId})
      }
    }

    return (
      <Button aditionalCSS="font-bold" text="Baixar DOCX" handleClick={() => GenerateDocx(exam)} />
    )
}