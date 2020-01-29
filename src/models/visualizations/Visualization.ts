import Transformer from '@/transformers/Transformer'

export interface TimePeriod {
  from: number
  to: number
}

export interface VisualizationBaseFields {
  id?: string;
  progress?: number;
  name: string;
  timePeriods?: Array<TimePeriod>
}

export interface VisualizationBaseFieldsDTO {
  id?: string;
  progress?: number;
  name: string;
  key: string;
  // eslint-disable-next-line camelcase
  time_periods?: Array<TimePeriod>
}

export default abstract class Visualization implements VisualizationBaseFields {
  id?: string;
  progress?: number;
  name: string;
  timePeriods: Array<TimePeriod>
  abstract parameters: Object;
  abstract data?: Object;
  abstract readonly key: string;
  static readonly key: string;
  static readonly title: string;
  static readonly imageUrl: string;
  static readonly description: string;
  static readonly longDescription: string;
  static readonly transformer: typeof Transformer;

  protected constructor ({ id, progress, name, timePeriods }: VisualizationBaseFields) {
    this.id = id
    this.progress = progress
    this.name = name
    this.timePeriods = timePeriods || []
  }
}
