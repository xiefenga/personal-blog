import { UnknowObject } from './helper'

export interface IQuote extends UnknowObject {
  id: string;
  content: string;
  translation: string;
  author: string;
  assign_date: string;
}