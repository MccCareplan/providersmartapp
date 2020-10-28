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

export function getLineChartOptionsObject(min: number, max: number, suggestedMinDate: Date, suggestedMaxDate: Date): {} {
  const opts =
    {
      responsive: false,
      maintainAspectRatio: true,
      scales: {
        yAxes: [{
          ticks: {
            suggestedMax: max,
            suggestedMin: min
          }
        }],
        xAxes: [{
          type: 'time',
          distribution: 'linear',
          ticks: {
            min: suggestedMinDate,
            max: suggestedMaxDate,
            maxTicksLimit: 7
          },
          time: {
            // unit: 'month',
            // format: 'dateFormat',
            displayFormats: {
              millisecond: 'D MMM, h:mm a',
              second: 'D MMM, h:mm a',
              minute: 'D MMM, h:mm a',
              hour: 'D MMM, h:mm a',
              day: 'D MMM, h:mm a',
              week: 'll',
              month: 'MMM',
              quarter: 'll',
              year: 'll'
            },
            tooltipFormat: 'MM-DD-YYYY',
          }
        }]
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

  return opts;
}

export function getEgrLineChartAnnotationsObject() {
      const annotations = {
      annotations: [
        {
          drawTime: 'beforeDatasetsDraw',
          type: 'box',
          id: 'egfr-critical',
          xScaleID: 'x-axis-0',
          yScaleID: 'y-axis-0',
          borderWidth: 0,
          yMin: 0,
          yMax: 15,
          backgroundColor: 'rgba(227, 127, 104,0.3)'
        },
        {
          drawTime: 'beforeDatasetsDraw',
          type: 'box',
          id: 'egfr-warning',
          xScaleID: 'x-axis-0',
          yScaleID: 'y-axis-0',
          borderWidth: 0,
          yMin: 15,
          yMax: 60,
          backgroundColor: 'rgba(247, 245, 116,0.3)'
        },
        {
          drawTime: 'beforeDatasetsDraw',
          type: 'box',
          id: 'egfr-ok',
          xScaleID: 'x-axis-0',
          yScaleID: 'y-axis-0',
          borderWidth: 0,
          yMin: 60,
          yMax: 100,
          backgroundColor: 'rgba(128, 204, 113,0.3)'
        }
      ]
    };
      return annotations;
}

export function formatEgfrResult(egfr: number, unit: string): string {
  let ret = '';
  if (egfr && unit) {
    ret = egfr.toString() + ' '
      + unit.substring(0, unit.length - 1)
      + '<sup>' + unit.substring(unit.length - 1) + '</sup>';
  }
  return ret;
}
