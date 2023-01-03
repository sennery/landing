import { ref, computed } from "vue"

export function useTimePassed(date: string) {
  const stampDate = +new Date(date)
  const stampNow = ref(+new Date())

  setInterval(() => stampNow.value = +new Date(), 1000)

  const diff = computed(() => stampNow.value - stampDate)

  const years = computed(() => Math.floor(diff.value / (1000 * 60 * 60 * 24 * 365.25)))
  const weeks = computed(() => Math.floor((diff.value / (1000 * 60 * 60 * 24 * 7)) - years.value * (365.25 / 7)))
  const days = computed(() => Math.floor((diff.value / (1000 * 60 * 60 * 24))  - years.value * 365.25 - weeks.value * 7))
  const hours = computed(() => Math.floor((diff.value / (1000 * 60 * 60)) - 24 * (years.value * 365.25 + weeks.value * 7 + days.value)))
  const minutes = computed(() => Math.floor((diff.value / (1000 * 60) - 60 * (24 * (years.value * 365.25 + weeks.value * 7 + days.value) + hours.value))))
  const seconds = computed(() => Math.floor(diff.value / 1000 - 60 * (60 * (24 * (years.value * 365.25 + weeks.value * 7 + days.value) + hours.value) + minutes.value)))

  const sumSeconds = computed(() => Math.floor(diff.value / 1000))

  return { years, weeks, days, hours, minutes, seconds, sumSeconds }
}