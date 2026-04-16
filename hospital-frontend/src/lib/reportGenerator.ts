import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

type PatientReportData = {
  name: string;
  id: string | number;
  nic: string;
  status: string;
};

type PatientEvent = {
  date: string;
  title: string;
  type: string;
  provider: string;
  notes: string;
};

export const generatePatientReport = (patient: PatientReportData, events: PatientEvent[]) => {
  const doc = new jsPDF();
  const timestamp = new Date().toLocaleString();

  // 1. BRANDING & HEADER
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(59, 130, 246); // MediFlow Blue
  doc.text("MEDIFLOW +", 14, 20);
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text("SECURE CLINICAL RECORD • NODAL UPLINK: ITBIN-2211-0249", 14, 28);
  doc.line(14, 32, 196, 32);

  // 2. PATIENT IDENTITY BLOCK
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text("PATIENT IDENTITY", 14, 45);
  
  autoTable(doc, {
    startY: 48,
    head: [['Attribute', 'Registry Value']],
    body: [
      ['Full Name', patient.name],
      ['Patient REF_ID', patient.id],
      ['NIC Number', patient.nic],
      ['Clinical Status', patient.status],
    ],
    theme: 'striped',
    headStyles: { fillColor: [59, 130, 246] },
  });

  // 3. CLINICAL NARRATIVE (Timeline Events)
  const finalY = ((doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? 48) + 15;
  doc.text("COMPREHENSIVE CLINICAL TIMELINE", 14, finalY);

  const tableRows = events.map(event => [
    event.date,
    event.title,
    event.type,
    event.provider,
    event.notes
  ]);

  autoTable(doc, {
    startY: finalY + 5,
    head: [['Date', 'Protocol/Visit', 'Type', 'Case Lead', 'Clinical Observations']],
    body: tableRows,
    theme: 'grid',
    headStyles: { fillColor: [30, 41, 59] }, // Slate 800
    columnStyles: {
      4: { cellWidth: 60 } // Give more space for notes
    }
  });

  // 4. FOOTER & AUTHENTICATION
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(`Generated on: ${timestamp} • Page ${i} of ${pageCount}`, 14, 285);
    doc.text("Digitally Signed by MediFlow Protocol Manager", 140, 285);
  }

  // SAVE FILE
  doc.save(`MediFlow_Report_${patient.id}.pdf`);
};