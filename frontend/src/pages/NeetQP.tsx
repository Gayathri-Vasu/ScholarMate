import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const neetPdfs: { title: string; year?: number; fileUrl: string; desc?: string }[] = [
  { title: 'NEET 2021 Question_Paper', fileUrl: '/pdf/neet2021.pdf', desc: 'Official PYQ' },
  { title: 'NEET_2022_Question_Paper', fileUrl: '/pdf/neet2022.pdf', desc: 'Official PYQ' },
  { title: 'NEET_2023_Manipur_Question_Paper', fileUrl: '/pdf/neet2023manipur.pdf', desc: 'Official PYQ' },
  { title: 'NEET_2023_UG_Question_Paper', fileUrl: '/pdf/neet2023ug.pdf', desc: 'Official PYQ' },
  { title: 'NEET_2024_UG_Question_Paper', fileUrl: '/pdf/neet2024ug.pdf', desc: 'Official PYQ' },
  { title: 'NEET_2024_JAR_Question_Paper', fileUrl: '/pdf/neet2024jar.pdf', desc: 'Official PYQ' },
  { title: 'NEET_2025_UG_Question_Paper', fileUrl: '/pdf/neet2025ug.pdf', desc: 'Official PYQ' },
  { title: 'NEET_2020_UG_Question_Paper', fileUrl: '/pdf/neet2020.pdf', desc: 'Official PYQ' },
  // Add or edit more PDFs as needed
];

export default function NeetQP() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">NEET Question Papers</h1>
      <p className="text-muted-foreground mb-8">
        Access NEET previous year papers and boost your exam preparation with official PDFs.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {neetPdfs.map((pdf, idx) => (
          <Card key={idx} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-base line-clamp-2">
                {pdf.title}{pdf.year ? ` (${pdf.year})` : ''}
              </CardTitle>
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

