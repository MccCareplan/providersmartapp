
interface VitalSignsTableData {
  date?: string;
  systolic?: number;
  diastolic?: number;
}

interface VitalSignsData {
  date?: string;
  value?: number;
}

interface VitalSignsChartData {
  data?: Array <VitalSignsData>;
  label?: string;  /* Systolic, Diastolic */
  fill?: boolean;  /* false */
}

interface VitalSigns {
  mostRecentSystolic?: VitalSignsData;
  mostRecentDiastolic?: VitalSignsData;
  tableData?: Array <VitalSignsTableData>;
  chartData?: Array <VitalSignsChartData>;
  months?: Array<string>;
  suggestedMin?: Date;
}

export { VitalSignsTableData, VitalSignsData, VitalSignsChartData, VitalSigns };
