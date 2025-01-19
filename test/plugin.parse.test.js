import dayjs from 'dayjs'
import hijri from '../src'

dayjs.extend(hijri)
dayjs.calendar('hijri')

describe('Parse Valid String', () => {
    // 2024-12-15
    const date = dayjs('1446-06-14', { hijri: true })

    test('valid jalali date', () => {
        expect(date.year()).toEqual(1446)
        expect(date.month()).toEqual(5)
        expect(date.date()).toEqual(14)
    })

    const date2 = dayjs('1446-06', { hijri: true })

    test('valid jalali date without day', () => {
        expect(date2.year()).toEqual(1446)
        expect(date2.month()).toEqual(5)
        expect(date2.date()).toEqual(1)
    })

    const gregory = date.calendar('gregory')

    test('convert to gregory', () => {
        expect(gregory.year()).toEqual(2024)
        expect(gregory.month()).toEqual(11)
        expect(gregory.date()).toEqual(15)
    })
})

it('Parse invalid String', () => {
    const date = dayjs('', { hijri: true })
    expect(date.year()).toBeNaN()

    const date2 = dayjs(null, { hijri: true })
    expect(date2.year()).toBeNaN()
})