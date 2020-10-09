import {GoalTarget} from './app/generated-data-api';
import {Label} from 'ng2-charts';

export function formatGoalTargetValue(target: GoalTarget, mostRecentResultValue: string): any[] {
  let formatted = 'Unknown Type: ';
  let highlighted = false;
  let rval = 0;
  let qval = 0;
  let highval = 0;
  let lowval = 0;

  rval = Number(mostRecentResultValue);
  if (isNaN(rval)) {
    rval = 0;
  }

  if (target.value !== undefined) {
    formatted += ' ' + target.value.valueType;
    switch (target.value.valueType) {
      case 'String': {
        formatted = target.value.stringValue;
        break;
      }
      case 'Integer': {
        formatted = target.value.integerValue.toString();
        break;
      }
      case 'Boolean': {
        formatted = String(target.value.booleanValue);
        break;
      }
      case 'CodeableConcept': {
        // todo:  formatTargetValue CodeableConcept
        break;
      }
      case 'Quantity': {
        formatted = target.value.quantityValue.comparator
          + target.value.quantityValue.value.toString()
          + ' ' + target.value.quantityValue.unit;
        qval = Number(target.value.quantityValue.value);
        if (!isNaN(qval)) {
          if (target.value.quantityValue.comparator === '<') {
            if (rval >= qval) {
              highlighted = true;
            }
          }
          if (target.value.quantityValue.comparator === '>') {
            if (rval <= qval) {
              highlighted = true;
            }
          }
          if (target.value.quantityValue.comparator === '=') {
            if (rval !== qval) {
              highlighted = true;
            }
          }
        }
        break;
      }
      case 'Range': {
        formatted = target.value.rangeValue.low.value
          + ' - ' + target.value.rangeValue.high.value
          + ' ' + target.value.rangeValue.high.unit;

        highval = Number(target.value.rangeValue.high.value);
        lowval = Number(target.value.rangeValue.low.value);
        if (!isNaN(lowval) && !isNaN(highval)) {
          if (rval < lowval || rval > highval) {
            highlighted = true;
          }
        }
        break;
      }
      case 'Ratio': {
        // todo:  formatTargetValue Ratio
        break;
      }
      case 'Period': {
        // todo:  formatTargetValue Period
        break;
      }
      case 'Date': {
        // todo:  formatTargetValue Date
        break;
      }
      case 'Time': {
        // todo:  formatTargetValue Time
        break;
      }
      case 'DateTime': {
        // todo:  formatTargetValue DateTime
        break;
      }
      case 'SampledData': {
        // todo:  formatTargetValue SampledData
        break;
      }
      case 'DurationValue': {
        // todo:  formatTargetValue DurationValue
        break;
      }
      case 'TimingValue': {
        // todo:  formatTargetValue TimingValue
        break;
      }
      case 'InstantValue': {
        // todo:  formatTargetValue InstantValue
        break;
      }
      case 'IdentifierValue': {
        // todo:  formatTargetValue IdentifierValue
        break;
      }

    }
  }

  return [formatted, highlighted];

}

export function reformatYYYYMMDD(dt): string {
  if (dt) {
    const date = new Date(dt);
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
      .toISOString()
      .split('T')[0];
  } else {
    return '';
  }
}

export function getLineChartOptionsObject(suggestedMinDate: Date, suggestedMaxDate: Date): { }   {
  const opts =
   {
    responsive: false,
    maintainAspectRatio: true,
    scales: {
      yAxes: {
        ticks: {
          suggestedMax: 180,
          suggestedMin: 50
        }
      },
      xAxes: {
        type: 'time',
        ticks: {
          suggestedMin: suggestedMinDate,
          suggestedMax: suggestedMaxDate
        },
        time: {
          unit: 'day',
          format: 'dateFormat',
          displayFormats: {
            day: 'MMM'
          },
          tooltipFormat: 'MM-DD-YYYY',
        }
      }
    }
  };

  /*

            millisecond: 'MMM DD',
            second: 'MMM DD',
            minute: 'MMM DD',
            hour: 'MMM DD',
            day: 'MMM DD',
            week: 'MMM DD',
            month: 'MMM DD',
            quarter: 'MMM DD',
            year: 'MMM DD',
   */

  // console.log('Line Chart Options: ', opts);
  return opts;
}
