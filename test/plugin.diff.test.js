import dayjs from 'dayjs'
import hijri from '../src'

dayjs.extend(hijri)
dayjs.calendar('hijri')

describe('diff two dates', () => {
    const a = dayjs('1446/06/01', { hijri: true })
    const b = dayjs('1446/09/12', { hijri: true })

    it('diff(float)', () => {
        expect(a.diff(b, 'month', true)).toEqual(-3.413793103448276
    )
    })

    it('diff(month)', () => {
        expect(a.diff(b, 'month', false)).toEqual(-3)
    })

    it('diff(day)', () => {
        expect(a.diff(b, 'day')).toEqual(-100)
    })

    it('diff(day): a gregory and hijri', () => {
        expect(a.calendar('gregory').diff(b, 'day')).toEqual(-100)
    })

    it('diff(year)', () => {
        expect(a.diff(b, 'year')).toEqual(0)
    })
})