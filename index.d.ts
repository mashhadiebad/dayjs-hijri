import { PluginFunc, ConfigType } from 'dayjs';

declare const plugin: PluginFunc;
export = plugin;

type calendarType = 'hijri' | 'gregory';

declare module 'dayjs' {
  interface Dayjs {
    calendar(calendarType: calendarType): Dayjs;

    isHijri(): boolean;
  }
}
