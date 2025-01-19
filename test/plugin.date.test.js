import dayjs from 'dayjs'
import hijri from '../src'

dayjs.extend(hijri)

it('Should set currect date', () => {
    const d1 = dayjs('1446-08-09', { hijri: true })
    const d2 = dayjs('1446-08-10', { hijri: true }).calendar('hijri').date(9)

    expect(d1.isSame(d2)).toBeTruthy()
})