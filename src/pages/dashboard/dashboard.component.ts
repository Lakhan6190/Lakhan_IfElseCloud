import { Component, inject, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import{ MemberService } from '../../service/member.service';
import { HttpClientModule } from '@angular/common/http';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmationModalComponent } from '../../shared/modal/confirmation-modal/confirmation-modal.component';
import { LoadingService } from '../../service/loading.service';

export interface Row {
  name: {
    first_name: string;
    last_name: string;
    handle?: string;
  };
  [key: string]: any;
}

@Component({
  selector: 'app-dashboard',
  imports: [HighchartsChartModule, HttpClientModule, FormsModule, NgClass, NgIf, ConfirmationModalComponent ],
  providers: [MemberService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  Highcharts = Highcharts;
  memberService = inject(MemberService);
  loadingService = inject(LoadingService);
  showModal = false;
  showEditModal = false;
  selectedUserId: string | null = null;
  selectedUser: any = null;
  rootStyles = getComputedStyle(document.documentElement);
  fontFamily = this.rootStyles.getPropertyValue('--font-family').trim();
  chartOptions: Highcharts.Options = {}; 
  chartOptionsvendor: Highcharts.Options = {}; 
  grid_columns: { column_key: any; column_name: string  }[] = [];
  grid_rows : Row[] = [];
  pages: (number | string)[] = [
    1, 2, 3, 4, 5, '...', 10];

    
  loadBreakdownChart() {
    this.chartOptions  = {
    chart: {
      type: 'column'
    },
    title: {
      text: '',
    },
    credits: {
      enabled: false
    },
    legend: {
      enabled: false
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun','Jul','Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      title: {
        text: 'Month',
        style: {
          color: 'gray',
          fontFamily: this.fontFamily,
        }
      },

    },
    yAxis: {
      gridLineWidth: 0,
      tickInterval: 20, 
      min: 0,
      title: {
        text: 'Secutity Rating',
        style: {
          color: 'gray',
          fontFamily: this.fontFamily,
        }
      },
      stackLabels: {
        enabled: false,
        style: {
          fontWeight: 'bold',
          color: 'gray'
        }
      }
    },
   
    
    tooltip: {
      enabled:false,
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}',

    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: false
        }
      }
    },
    series: [
      {
        name: 'John',
        type: 'column',
        data: [20, 30, 40, 20, 30, 40, 20, 30, 40, 20, 30, 40],
        color: '#e6e6e6',
        borderRadius: 5,
      },
      {
        name: 'Jane',
        type: 'column',
        data: [10, 30, 40, 60, 40, 20, 40, 60, 70, 80, 90, 100],
        color:'#9979e6',
        borderRadius: 5,
      },
      {
        name: 'Joe',
        type: 'column',
        data: [30, 40, 40, 20, 50, 40, 20, 30, 40, 20, 30, 40],
        color:'#6343c0',
        borderRadius: 5,
      },   ]
  };
}

loadmonitoredChart() {
  this.chartOptionsvendor= {
    chart: {
      type: 'pie',
      backgroundColor: 'transparent'
    },
    credits: {
      enabled: false
    },
    title: {
      text: '70',
      align: 'center',
      verticalAlign: 'middle',
      y: 40,
      x: 0,
      style: {
          fontSize: '2em'
      }
  },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '70%'],
        size: '140%',
        innerSize: '80%',
        dataLabels: {
          enabled: false,
          format: '{point.name}: {point.y}'
        }
      }
    },
    series: [{
      type: 'pie',
      name: 'Progress',
      borderRadius: 5,
      data: [
        { name: 'Completed', y: 70, color: '#6343c0' }, 
        { name: 'Remaining', y: 30, color: '#e6e6e6' }  
      ]
    }]
  };
}

  

  ngOnInit(): void {
    this.loadingService.show();
    this.loadBreakdownChart();
    this.loadmonitoredChart();
    this.memberService.getMembers().subscribe(members => {
      console.log(members);
      this.grid_columns = members.grid_columns;
      console.log("Columns", this.grid_columns);
      this.grid_rows = members.grid_data;
      
      console.log("Data", this.grid_rows);
      localStorage.setItem('gridData', JSON.stringify(this.grid_rows));

      this.loadingService.hide();
        }, error => {
      console.error('Error fetching members:', error);
      this.loadingService.hide();

    });
  }

  toggleAllRows(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.grid_rows.forEach(row => row['selected'] = checked);
  }
  
  editRow(user: any) {
    console.log('Edit row:', user);
    this.selectedUser = user;
    this.showEditModal = true;
    // Your edit logic
  }
  
  deleteRow(user: any) {
    this.selectedUser = user;
    this.selectedUserId = user.id;
    console.log('Delete row:', user?.name?.first_name );
  this.showModal = true;
  }

  onDeleteConfirmed() {
    const stored = localStorage.getItem('gridData');
    if (stored && this.selectedUserId) {
      let data = JSON.parse(stored);
      data = data.filter((user: any) => user.id !== this.selectedUserId);
      localStorage.setItem('gridData', JSON.stringify(data));
      this.grid_rows = data;
    }
    this.showModal = false;
    this.selectedUserId = null;
  }
  
  onCancel() {
    this.showModal = false;
  }

  onOkEdit() {
    this.showEditModal = false;
  }

  
}

