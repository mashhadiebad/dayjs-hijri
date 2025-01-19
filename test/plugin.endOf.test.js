import dayjs from 'dayjs'
import hijri from '../src'

dayjs.extend(hijri)
dayjs.calendar('hijri')

it('endOfMonth - months with 30 days', () => {
    const date = dayjs('1446-07-01', { hijri: true })
    const date2 = date.endOf('month')
    expect(date2.year()).toEqual(date.year())
    expect(date2.month()).toEqual(date.month())
    expect(date2.date()).toEqual(30)
})

it('endOfMonth - months with 29 days', () => {
    const date = dayjs('1446-12-01', { hijri: true })
    const date2 = date.endOf('month')
    expect(date2.year()).toEqual(date.year())
    expect(date2.month()).toEqual(date.month())
    expect(date2.date()).toEqual(29)
})

it('endOfYear', () => {
    const date = dayjs('1446-08-01', { hijri: true })
    const date2 = date.endOf('year')
    expect(date2.year()).toEqual(date.year())
    expect(date2.month()).toEqual(11)
    expect(date2.date()).toEqual(29)
})


it('endOfWeek', () => {
    const date = dayjs('1446-07-01', { hijri: true })
    const date2 = date.endOf('week')
    expect(date2.day()).toEqual(5)
})