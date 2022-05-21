<template>
    <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <div class="card">
            <div class="card-header">
                {{ category.name }}
            </div>
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <label class="font-weight-bold">Incoming</label>
                    <div><span class="badge badge-success">{{ category.values.incoming }}</span></div>
                </div>
                <div class="d-flex justify-content-between">
                    <label class="font-weight-bold">Expenses</label>
                    <div><span class="badge badge-danger">{{ category.values.expense }}</span></div>
                </div>
                <div class="d-flex justify-content-between">
                    <label class="font-weight-bold">Balance</label>
                    <div><span class="badge badge-primary">{{ category.values.balance }}</span></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'StatisticCard',
    props: ['category'],
}
</script>
