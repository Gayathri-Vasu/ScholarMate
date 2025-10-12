import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const tnpscPdfs: { title: string; year?: number; fileUrl: string; desc?: string }[] = [
	{ title: 'General_Tamil_QP_2025',  fileUrl: '/pdf/General_Tamil_QP_2025.pdf', desc: 'Official PYQ' },
{ title: 'General_Tamil_QP_2025', fileUrl: '/pdf/General_Tamil_QP_2025.pdf', desc: 'Official PYQ' },
{ title: 'TNPSC_Group1_2014_GeneralStudies', fileUrl: '/pdf/TNPSC_Group1_2014_GeneralStudies.pdf', desc: 'Official PYQ' },
{ title: 'TNPSC_Group1_2015_GeneralStudies', fileUrl: '/pdf/TNPSC_Group1_2015_GeneralStudies.pdf', desc: 'Official PYQ' },
{ title: 'TNPSC_Group1_2019_GeneralStudies', fileUrl: '/pdf/TNPSC_Group1_2019_GeneralStudies.pdf', desc: 'Official PYQ' },
{ title: 'TNPSC_Group1_2021_GeneralStudies', fileUrl: '/pdf/TNPSC_Group1_2021_GeneralStudies.pdf', desc: 'Official PYQ' },
{ title: 'TNPSC_Group1_2022_GeneralStudies', fileUrl: '/pdf/TNPSC_Group1_2022_GeneralStudies.pdf', desc: 'Official PYQ' },
{ title: 'TNPSC_Group1_2024_GeneralStudies', fileUrl: '/pdf/TNPSC_Group1_2024_GeneralStudies.pdf', desc: 'Official PYQ' },
{ title: 'TNPSC-Group-2-English', fileUrl: '/pdf/TNPSC-Group-2-English.pdf', desc: 'Official PYQ' },
{ title: 'TNPSC_GK_Questions', fileUrl: '/pdf/TNPSC_GK_Questions.pdf', desc: 'Official PYQ' },

];

export default function TnpscQP() {
	return (
		<div className="container mx-auto px-4 py-12">
			<h1 className="text-3xl font-bold mb-6">TNPSC Question Papers</h1>
			<p className="text-muted-foreground mb-8">Vanakkam! Browse TNPSC previous year papers and practice PDFs.</p>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{tnpscPdfs.map((pdf, idx) => (
					<Card key={idx} className="flex flex-col">
						<CardHeader>
							<CardTitle className="text-base line-clamp-2">{pdf.title}{pdf.year ? ` (${pdf.year})` : ''}</CardTitle>
						</CardHeader>
						<CardContent className="mt-auto">
							{pdf.desc && <p className="text-sm text-muted-foreground mb-3">{pdf.desc}</p>}
							<a href={pdf.fileUrl}>
								<Button size="sm" variant="secondary">📄 View / Download</Button>
							</a>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}


