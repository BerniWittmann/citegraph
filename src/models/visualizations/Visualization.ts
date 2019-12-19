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

  protected constructor ({ id, progress, name, timePeriods }: VisualizationBaseFields) {
    this.id = id
    this.progress = progress
    this.name = name
    this.timePeriods = timePeriods || []
  }
}
