import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import jalali from '../src'

dayjs.extend(weekday)
dayjs.extend(jalali)

it('Should return correct weekday', () => {
    //Rajab 19, 1446 AH
    const date = dayjs('1446-07-19', { hijri: true }).locale('ar')

    expect(date.day()).toBe(0)
    expect(date.weekday()).toBe(1)
})