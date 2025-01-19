import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import hijri from '../src'

dayjs.extend(utc)
dayjs.extend(hijri)

it('Should respect utc', () => {
    const date = dayjs.utc().calendar('hijri')

    expect(date.isUTC()).toBe(true)
})