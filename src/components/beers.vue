<template>
  <v-data-table
    :headers="headers"
    :items="beers"
	:total-items="pagination.totalItems"
	:pagination.sync="pagination"
	@update:pagination="getBeers"
	item-key="name"
    class="elevation-1"
  >
  <h1>Beers</h1>
    <template v-slot:items="props">
		<td>
			<v-layout justify-left>
				{{ props.item.name }}
			</v-layout>
		</td>
		<td class="text-xs-right">
			<v-layout justify-left>
				{{ props.item.first_brewed }}
			</v-layout>
		</td>
		<td class="text-xs-right">
			<v-layout justify-left>
				{{ props.item.abv }}
			</v-layout>
		</td>
    </template>
  </v-data-table>
</template>

<script>
import {getList, getListCount} from '../services/rest';

export default {
  name: "Beers",
  props: {

  },
  data: () => ( {			
		pagination: {
			page: 1,
			rowsPerPage: 25,
			totalItems: 0
		},
		headers: [
			{
				text: 'Name',
				align: 'left',
				sortable: false,
				value: 'name'
			},
			{
				text: 'First brewed',
				align: 'left',
				sortable: false,
				value: 'first_brewed'
			},
			{
				text: 'Alcohol',
				align: 'left',
				sortable: false,
				value: 'abv'
			}
		],
		beers: [],
		malt: 'Extra Pale'
	}
  ),
  
  methods:{
	getCurrentPage: function(page, firstNbPerPage){
	
		let self = this;
		getListCount('beers', page)
		.then(function (response) {
			
			page++;
			let currNbPerPage = response.data.length;
			self.pagination.totalItems += currNbPerPage;
			if (currNbPerPage >= firstNbPerPage)
			{
				self.getCurrentPage(page, self);			
			}
        }, function (response) {
            self.errorMessage = response;
        });
	},  
	 getTotal: function(){
		let self = this;
		let page = 1;
		
		// get number of beer from page 1
		getListCount('beers', page)
		.then(function (response) {
			let firstNbPerPage = response.data.length;
			self.pagination.rowsPerPage = firstNbPerPage;
			self.beers = response.data;
			
			page++;
			self.pagination.totalItems += firstNbPerPage;
			// get number of beers from following pages
			self.getCurrentPage(page, firstNbPerPage);
        }, function (response) {
            self.errorMessage = response;
        });
	 },
     getBeers: function() {
		
		let self = this;
		let pagination = self.pagination;
	 
		let beerParams = {
			malt: self.malt
		};
		getList('beers', pagination.page, pagination.rowsPerPage, beerParams)
		.then(function (response) {
            self.beers = response.data;
        }, function (response) {
            self.errorMessage = response;
        });
	 }
  },
  beforeMount(){
    this.getTotal();
  },
};
</script>