"use client"

import Button from "@/app/components/layout/button";
import { Exam, ExamQuestionDB } from "@/app/lib/types/types"
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

export default function DownloadPDFBtn( { exam }: { exam: Exam } ) {

    const styles = StyleSheet.create({
        page: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: 20,
            fontSize: "12pt",
            padding: 20,
            fontFamily: 'Helvetica'
        },
        header: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 20,
            textTransform: exam.uppercase ? "uppercase" : undefined,
            width: "100%"
        }
    });



    const HeaderPDF = () => (
        <View style={styles.header}>
      		<Text style={{fontFamily: "Helvetica-Bold", fontSize: "18pt"}}>{exam.title} - {exam.subject}</Text>
          	<Text>{exam.school_name}</Text>
          	<Text style={{alignSelf: "flex-start"}}><Text style={{fontFamily: "Helvetica-Bold"}}>Professora:</Text> {exam.teacher}</Text>
          	<View style={{display: "flex", flexDirection: "row", width: "100%", gap: 5}}>
          		<Text style={{fontFamily: "Helvetica-Bold", flexBasis: "auto"}}>Nome:</Text>
                <View style={{flexBasis: "70%", borderBottom: "1px solid black"}}></View>
                <Text style={{fontFamily: "Helvetica-Bold", flexBasis: "auto"}}>{exam.grade}:</Text>
                <View style={{flexBasis: "10%", borderBottom: "1px solid black"}}></View>
          	</View>
          	{exam.obs && (
              	<Text>{exam.obs}</Text>
            )}
      	</View>
    )

    const QuestionPDF = ( { question }: { question: ExamQuestionDB}) => (
        <View style={{display: "flex", flexDirection: "column", gap: 20, textTransform: question.uppercase ? "uppercase" : undefined}}>
            {question.layout === "support" && (
                <View style={{display: "flex", flexDirection: "column", gap: 12}}>
                    {question.support!.includes("Texto:") && question.support!.split("Texto:")[0] && (
                        <Text style={{fontFamily: "Helvetica-Bold"}}>{question.support!.split("Texto:")[0].replaceAll("\n", "")}</Text>
                    )}
                    {question.support!.split("Texto:")[1].split("\n").filter(paragraph => paragraph.trim() !== "").map((paragraph, i) => (
                        <Text style={{textIndent: 30, textAlign: "justify"}} key={i}>{paragraph}</Text>
                    ))}
                </View>
            )}
            {question.layout !== "math_expressions" && (
                <>
                    {question.question!.split("\n").filter(paragraph => paragraph.trim() !== "" && !paragraph.includes("Resposta")).map((paragraph, i) => (
                        <Text key={i}>{i === 0 ? `${question.position || ""}) ${paragraph}` : paragraph}</Text>
                    ))}
                    {question.number_of_lines > 0 && new Array(question.number_of_lines).fill(null).map((_, i) => (
                        <View style={{height: 5, borderBottom: question.show_lines ? "1px solid black" : "none"}} key={i} />
                    ))}
                </>
            )}
            {question.layout === "math_expressions" && (
                <>
                    <Text>{`${question.position})`} Resolva as expressões matemáticas a seguir:</Text>
                    <View style={{display: "flex", flexDirection: "row", gap: 12, width: "100%", flexWrap: "wrap"}}>
                        {question.question!.replaceAll("--","").split("\n").filter(paragraph => paragraph.trim() !== "").map((paragraph, i) => (
                            <View style={{display: "flex", flexDirection: "column", flexBasis: "48%"}} key={i}>
                                <Text>{paragraph} =</Text>
                                {question.number_of_lines > 0 && new Array(question.number_of_lines).fill(null).map((_, i) => (
                                    <View style={{height: 25, borderBottom: question.show_lines ? "1px solid black" : "none"}} key={i} />
                                ))}
                            </View>
                        ))}
                    </View>
                </>
            )}
        </View>
    )

    const MyDocument = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                {exam.title && <HeaderPDF />}
                <View style={{width: "100%"}}>
                    {exam.questions.length !== 0 && (
                        <View style={{display: "flex", flexDirection: "column", gap: 20}}>
                            {exam.questions.map((question,i) => {
                                return <QuestionPDF key={i} question={question} />
                            })}
                        </View>
                    )}
                </View>
            </Page>
        </Document>
    );

    return (
        <PDFDownloadLink document={<MyDocument />} fileName={`${exam.title}.pdf`}>
            <Button text="Baixar PDF" />
        </PDFDownloadLink>
    )
}