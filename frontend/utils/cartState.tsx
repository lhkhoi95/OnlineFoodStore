function getTotal() {
    const total: number | null = Number(localStorage.getItem('currentTotal'))
    if (total) {
        return total
    }
    return 0.00
}

function setTotal(total: number) {
    localStorage.setItem('currentTotal', total.toString())
}

export { getTotal, setTotal }