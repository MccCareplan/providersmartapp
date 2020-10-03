import {ChartData, ChartDataSets, ChartPoint} from 'chart.js';
import {Label} from 'ng2-charts';
import {getLineChartOptionsObject} from '../../utility-functions';

interface VitalSignsTableData {
  date?: string;
  systolic?: number;
  diastolic?: number;
}

interface VitalSignsData {
  date?: Date;
  value?: number;
}

interface VitalSignsDataForDisplay {
  date?: string;
  value?: number;
}

interface VitalSignsChartData {
  data?: Array<VitalSignsData>;
  label?: string;  /* Systolic, Diastolic */
  fill?: boolean;  /* false */
}

interface VitalSigns {
  mostRecentSystolic?: VitalSignsDataForDisplay;
  mostRecentDiastolic?: VitalSignsDataForDisplay;
  tableData?: Array<VitalSignsTableData>;
  chartData?: Array<ChartDataSets>;
  months?: Array<Label>;
  suggestedMin?: Date;
  lineChartOptions?: { };
}


/*
interface VitalSigns {
  mostRecentSystolic?: VitalSignsDataForDisplay;
  mostRecentDiastolic?: VitalSignsDataForDisplay;
  tableData?: Array<VitalSignsTableData>;
  chartData?: Array<VitalSignsChartData>;
  months?: Array<string>;
  suggestedMin?: Date;
}
*/

const emptyVitalSignsData: ChartPoint = {};
// const emptyVitalSignsData: VitalSignsData = {};
// const emptyVitalSignsTableData: VitalSignsTableData[] = [{}];
const emptyVitalSignsTableData: VitalSignsTableData[] = [];
/*
const emptyVitalSignsChartData: VitalSignsChartData[] = [
  {
    data: [emptyVitalSignsData],
    fill: false,
    label: 'Systolic'
  },
  {
    data: [emptyVitalSignsData],
    fill: false,
    label: 'Diastolic'
  }];
*/
const emptyVitalSignsChartData: ChartDataSets[] = [
  {
    data: [emptyVitalSignsData],
    fill: false,
    label: 'Systolic'
  },
  {
    data: [emptyVitalSignsData],
    fill: false,
    label: 'Diastolic'
  }];

const emptyVitalSigns: VitalSigns = {
  mostRecentSystolic: {},
  mostRecentDiastolic: {},
  tableData: emptyVitalSignsTableData,
  chartData: emptyVitalSignsChartData,
  months: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  suggestedMin: new Date('2020-01-01'),
  lineChartOptions: getLineChartOptionsObject(new Date('2016-11-30'))
};

export {
  VitalSignsTableData,
  VitalSignsData,
  VitalSignsChartData,
  VitalSigns,
  emptyVitalSigns,
  emptyVitalSignsChartData,
  emptyVitalSignsTableData,
  emptyVitalSignsData
};
