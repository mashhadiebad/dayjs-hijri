import dayjs from 'dayjs'
import hijri from '../src'

dayjs.extend(hijri)
dayjs.calendar('hijri')

it('startOfMonth', () => {
    const date = dayjs('1446-06-14', { hijri: true })
    const date2 = date.startOf('month')
    expect(date2.year()).toEqual(date.year())
    expect(date2.month()).toEqual(date.month())
    expect(date2.date()).toEqual(1)
})

it('startOfWeek', () => {
    const date = dayjs('1446-06-14', { hijri: true })
    const date2 = date.startOf('week')
    expect(date2.day()).toEqual(6)
})

it('startOfYear', () => {
    const date = dayjs('1446-06-14', { hijri: true })
    const date2 = date.startOf('year')
    expect(date2.year()).toEqual(date.year())
    expect(date2.month()).toEqual(0)
    expect(date2.date()).toEqual(1)
})