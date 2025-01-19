import dayjs from 'dayjs'
import hijri from '../src'

dayjs.extend(hijri)
dayjs.calendar('hijri')

it('add 1 day in the middle of the month', () => {
    const date = dayjs('1446-07-14', { hijri: true })
    const date2 = date.add(1, 'day')
    expect(date2.year()).toEqual(date.year())
    expect(date2.month()).toEqual(date.month())
    expect(date2.date()).toEqual(date.date() + 1)
})

it('add 1 day in the end of the month', () => {
    const date = dayjs('1446/06/30', { hijri: true })
    const date2 = date.add(1, 'day')
    expect(date2.year()).toEqual(date.year())
    expect(date2.month()).toEqual(date.month() + 1)
    expect(date2.date()).toEqual(1)
})

it('add 1 month in the middle of the year', () => {
    const date = dayjs('1446/07/14', { hijri: true })
    const date2 = date.add(1, 'month')
    expect(date2.year()).toEqual(date.year())
    expect(date2.month()).toEqual(date.month() + 1)
    expect(date2.date()).toEqual(date.date())
})

it('add 1 month in the end of the year', () => {
    const date = dayjs('1446/12/13', { hijri: true })
    const date2 = date.add(1, 'month')
    expect(date2.year()).toEqual(date.year() + 1)
    expect(date2.month()).toEqual(0)
    expect(date2.date()).toEqual(date.date())
})

it('add 1 year', () => {
    const date = dayjs('1446/06/13', { hijri: true })
    const date2 = date.add(1, 'year')
    expect(date2.year()).toEqual(date.year() + 1)
    expect(date2.month()).toEqual(date.month())
    expect(date2.date()).toEqual(date.date())
})

test('add 11 months in the middle of the year', () => {
    const date = dayjs('1446/07/14', { hijri: true })
    const date2 = date.add(11, 'month')
    expect(date2.year()).toEqual(date.year() + 1)
    expect(date2.month()).toEqual(date.month() - 1)
    expect(date2.date()).toEqual(date.date())
})

describe('add 100 days', () => {
    let a = null
    let b = null

    beforeEach(() => {
        a = dayjs('1446/06/01', { hijri: true })
        b = dayjs('1446/09/12', { hijri: true })
    })

    it('add date', () => {
        expect(a.add(100, 'day')).toEqual(b)
    })
})

describe('add 1 month in Jum-II 30th', () => {
    let a = null
    let b = null

    beforeEach(() => {
        a = dayjs('1446/06/30', { hijri: true })
        b = dayjs('1446/07/29', { hijri: true })
    })

    it('add date', () => {
        expect(a.add(1, 'month')).toEqual(b)
    })
})