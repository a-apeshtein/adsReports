// AngularJS Application
var app = angular.module('adsReportsApp', []);

app.controller('MainController', function ($scope, $http, $timeout) {
    // Application State
    $scope.isLoggedIn = false;
    $scope.loading = false;
    $scope.credentials = {
        userName: '',
        password: ''
    };

    // Data Storage
    $scope.leads = [];
    $scope.actions = [];
    $scope.ad = null;
    $scope.filteredLeads = [];
    $scope.filteredActions = [];

    // Filters
    $scope.filters = {
        store: '',
        branch: '',
        computer: '',
        actionType: '',
        startDate: '',
        endDate: ''
    };

    $scope.showDeletedLeads = false;

    // Charts
    $scope.actionsChart = null;
    $scope.storesChart = null;
    $scope.actionsPieChart = null;
    $scope.mouseMovesChart = null;

    // Stations data
    $scope.stationsData = [];
    $scope.filteredStationsData = [];

    // Initialize
    $scope.init = function () {
        // Always start with login form - no auto-login
    };

    // Login Function - using existing getLeads method
    $scope.login = function () {
        $scope.loading = true;
        
        // Use the existing getLeads method
        $scope.getLeads();
    };

    // Logout Function
    $scope.logout = function () {
        // Clear all data
        $scope.isLoggedIn = false;
        $scope.leads = [];
        $scope.actions = [];
        $scope.ad = null;
        $scope.filteredLeads = [];
        $scope.filteredActions = [];
        $scope.stationsData = [];
        $scope.filteredStationsData = [];
        
        // Clear filters
        $scope.filters = {
            store: '',
            branch: '',
            computer: '',
            actionType: '',
            startDate: '',
            endDate: ''
        };
        $scope.showDeletedLeads = false;
        
        // Clear credentials
        $scope.credentials = {
            userName: '',
            password: ''
        };
        
        // Clear localStorage (no longer needed)
        
        // Destroy charts if they exist
        if ($scope.actionsChart) {
            $scope.actionsChart.destroy();
            $scope.actionsChart = null;
        }
        if ($scope.storesChart) {
            $scope.storesChart.destroy();
            $scope.storesChart = null;
        }
        if ($scope.actionsPieChart) {
            $scope.actionsPieChart.destroy();
            $scope.actionsPieChart = null;
        }
        if ($scope.mouseMovesChart) {
            $scope.mouseMovesChart.destroy();
            $scope.mouseMovesChart = null;
        }
        
        // Show success message
        alert('התנתקת בהצלחה. תוכלי להתחבר מחדש עם פרטים אחרים.');
    };

    // Existing getLeads method from your code - Updated to use CORS Proxy
    $scope.getLeads = function () {
        $http.post('https://corsproxy.io/?' + encodeURIComponent('https://ads.safer.link/advertiser/getLeads'), { 
            userName: $scope.credentials.userName, 
            password: $scope.credentials.password 
        }).then(function (response) {
            $scope.ad = response.data.ad;
            $scope.actions = response.data.actions;
            $scope.leads = response.data.leads;
            
            // Process leads quality using your existing method
            $scope.leads.forEach(function (lead) {
                lead.quality = $scope.checkLeadQuality(lead);
                lead.store_branch_computer = $scope.extractStoreBranchComputer(lead);
            });
            
            // Process actions
            $scope.actions.forEach(function (action) {
                action.store_branch_computer = $scope.extractStoreBranchComputer(action);
            });
            
            $scope.isLoggedIn = true;
            $scope.applyFilters();
            $scope.initializeCharts();
            $scope.processStationsData();
            $scope.initializeStationCharts();
            
        }).catch(function (error) {
            console.error('Login failed:', error);
            alert('שגיאה בהתחברות. אנא בדוק את פרטי ההתחברות.');
        }).finally(function () {
            $scope.loading = false;
        });
    };

    // Extract Store_Branch_Computer from type field
    $scope.extractStoreBranchComputer = function (item) {
        // For actions, the type field contains the store_branch_computer format
        if (item.type && typeof item.type === 'string' && item.type.includes('_')) {
            return item.type;
        }
        // For leads, we might need to extract from a different field
        if (item.store_branch_computer) {
            return item.store_branch_computer;
        }
        return 'לא זמין';
    };

    // Check Lead Quality - using your existing logic
    $scope.checkLeadQuality = function (lead) {
        let tel = lead.inputs.tel;
        let name = lead.inputs.name;
        let email = lead.inputs.email;

        let checktel = true;
        let checkName = true;
        let chekEmail = true;

        // Check telephone
        if (tel) {
            if (/^[0-9/-]+$/.test(tel)) {
                checktel = tel != undefined && (tel.startsWith("05") || tel.startsWith("02") || tel.startsWith("03") ||
                    tel.startsWith("08") || tel.startsWith("09") || tel.startsWith("04"));
                
                if (tel.includes("-")) {
                    tel = tel.replace("-", "");
                }
                
                if (tel.length === 9 || tel.length === 10 || tel.length === 7) {
                    let counters = new Array(10).fill(0);
                    for (let i = 0; i < tel.length; i++) {
                        counters[tel[i]] = counters[tel[i]] + 1;
                    }
                    
                    if (counters.some(item => item >= 4)) {
                        checktel = false;
                    }
                } else {
                    checktel = false;
                }
            } else {
                checktel = false;
            }
        }

        // Check name
        if (name) {
            checkName = /^[\u0590-\u05FF\s]+$/.test(name) || /^[a-zA-Z\s]+$/.test(name);
            let countSpace = name.split(" ").length - 1;
            let countChar = name.length;
            
            if (countSpace > 3 || countSpace > 3 && countChar > 25 || countChar > 25) {
                checkName = false;
            }
        }

        // Check email
        if (email) {
            chekEmail = email.endsWith(".com") || email.endsWith(".co.il") || 
                       email.endsWith(".CO.IL") || email.endsWith(".COM") || 
                       email.endsWith("bezeqint.net") || email.endsWith("BEZEQINT.NET");
        }

        return checktel && checkName && chekEmail;
    };

    // Apply Filters
    $scope.applyFilters = function () {
        $scope.filteredLeads = $scope.leads.filter(function (lead) {
            // Status filter - show deleted leads only if checkbox is checked
            if (lead.status === 2 && !$scope.showDeletedLeads) {
                return false;
            }
            
            // Date filters
            if ($scope.filters.startDate) {
                let startDate = new Date($scope.filters.startDate);
                let leadDate = new Date(lead.created_at);
                if (leadDate < startDate) return false;
            }
            
            if ($scope.filters.endDate) {
                let endDate = new Date($scope.filters.endDate);
                let leadDate = new Date(lead.created_at);
                if (leadDate > endDate) return false;
            }
            
            return true;
        });

        $scope.filteredActions = $scope.actions.filter(function (action) {
            // Store filter - check if action.type contains the store number
            if ($scope.filters.store && action.type && typeof action.type === 'string') {
                let parts = action.type.split('_');
                if (parts.length >= 1 && parts[0] !== $scope.filters.store) {
                    return false;
                }
            }
            
            // Branch filter
            if ($scope.filters.branch && action.type && typeof action.type === 'string') {
                let parts = action.type.split('_');
                if (parts.length >= 2 && parts[1] !== $scope.filters.branch) {
                    return false;
                }
            }
            
            // Computer filter
            if ($scope.filters.computer && action.type && typeof action.type === 'string') {
                let parts = action.type.split('_');
                if (parts.length >= 3 && parts[2] !== $scope.filters.computer) {
                    return false;
                }
            }
            
            // Action type filter - check if action has a numeric type field
            if ($scope.filters.actionType !== '') {
                let actionTypeValue = action.actionType || action.type;
                // If actionTypeValue is a string with underscores, it's store_branch_computer format
                // In this case, we need to look for the actual action type in a different field
                if (typeof actionTypeValue === 'string' && actionTypeValue.includes('_')) {
                    // For now, skip action type filtering when type field contains store_branch_computer
                    // This will be fixed when we understand the correct data structure
                    return true;
                } else if (actionTypeValue !== parseInt($scope.filters.actionType)) {
                    return false;
                }
            }
            
            // Date filters
            if ($scope.filters.startDate) {
                let startDate = new Date($scope.filters.startDate);
                let actionDate = new Date(action.created_at);
                if (actionDate < startDate) return false;
            }
            
            if ($scope.filters.endDate) {
                let endDate = new Date($scope.filters.endDate);
                let actionDate = new Date(action.created_at);
                if (actionDate > endDate) return false;
            }
            
            return true;
        });

        // Update charts
        $timeout(function () {
            $scope.updateCharts();
        }, 100);
    };

    // Get Unique Values for Filters
    $scope.getUniqueStores = function () {
        let stores = new Set();
        $scope.actions.forEach(function (action) {
            if (action.type && typeof action.type === 'string' && action.type.includes('_')) {
                let parts = action.type.split('_');
                if (parts.length >= 1) {
                    stores.add(parts[0]);
                }
            }
        });
        return Array.from(stores).sort();
    };

    $scope.getUniqueBranches = function () {
        let branches = new Set();
        $scope.actions.forEach(function (action) {
            if (action.type && typeof action.type === 'string' && action.type.includes('_')) {
                let parts = action.type.split('_');
                if (parts.length >= 2) {
                    branches.add(parts[1]);
                }
            }
        });
        return Array.from(branches).sort();
    };

    $scope.getUniqueComputers = function () {
        let computers = new Set();
        $scope.actions.forEach(function (action) {
            if (action.type && typeof action.type === 'string' && action.type.includes('_')) {
                let parts = action.type.split('_');
                if (parts.length >= 3) {
                    computers.add(parts[2]);
                }
            }
        });
        return Array.from(computers).sort();
    };

    // Statistics Functions
    $scope.getTotalLeads = function () {
        return $scope.leads.length;
    };

    $scope.getTotalActions = function () {
        return $scope.actions.length;
    };

    $scope.getActionsByType = function (type) {
        let counter = 0;
        for (let l of $scope.actions) {
            // Check if action has a separate actionType field, otherwise use type
            let actionType = l.actionType || l.type;
            if (actionType === type) counter++;
        }
        return counter;
    };

    $scope.getDeletedLeads = function () {
        let counter = 0;
        for (let l of $scope.leads) {
            if (l.status === 2) counter++;
        }
        return counter;
    };

    // Status Functions
    $scope.getStatusText = function (status) {
        switch (status) {
            case 0: return 'פעיל';
            case 1: return 'טופל';
            case 2: return 'מחוק';
            default: return 'לא ידוע';
        }
    };

    $scope.getStatusBadgeClass = function (status) {
        switch (status) {
            case 0: return 'badge-active';
            case 1: return 'badge-processed';
            case 2: return 'badge-deleted';
            default: return 'badge-secondary';
        }
    };

    $scope.getActionTypeText = function (type) {
        switch (type) {
            case 0: return 'פרסום עלה';
            case 1: return 'לחצו לפרטים';
            case 2: return 'תזוזת עכבר';
            case 3: return 'הזנת פרטים';
            case 4: return 'טעינה';
            default: return 'לא ידוע';
        }
    };

    $scope.getActionTypeBadgeClass = function (type) {
        switch (type) {
            case 0: return 'badge-ad';
            case 1: return 'badge-click';
            case 2: return 'badge-mouse';
            case 3: return 'badge-input';
            case 4: return 'badge-load';
            default: return 'badge-secondary';
        }
    };

    // Lead Status Management - using your existing method - Updated to use CORS Proxy
    $scope.setLeadStatus = function (lead, newStatus) {
        $http.post('https://corsproxy.io/?' + encodeURIComponent('https://ads.safer.link/advertiser/setLeadStatus'), { 
            leadId: lead.id, 
            newStatus, 
            userName: $scope.credentials.userName, 
            password: $scope.credentials.password 
        }).then(function (response) {
            lead.status = newStatus;
            $scope.applyFilters();
        });
    };

    // Charts Functions
    $scope.initializeCharts = function () {
        $timeout(function () {
            $scope.createActionsChart();
            $scope.createStoresChart();
        }, 500);
    };

    $scope.createActionsChart = function () {
        const ctx = document.getElementById('actionsChart');
        if (!ctx) return;

        const actionTypes = [
            { type: 0, label: 'פרסום עלה', color: '#fd7e14' },
            { type: 1, label: 'לחצו לפרטים', color: '#28a745' },
            { type: 2, label: 'תזוזת עכבר', color: '#ffc107' },
            { type: 3, label: 'הזנת פרטים', color: '#6f42c1' },
            { type: 4, label: 'טעינה', color: '#17a2b8' }
        ];

        const data = actionTypes.map(item => ({
            label: item.label,
            data: $scope.getActionsByType(item.type),
            backgroundColor: item.color,
            borderColor: item.color
        }));

        $scope.actionsChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: data.map(item => item.label),
                datasets: [{
                    data: data.map(item => item.data),
                    backgroundColor: data.map(item => item.backgroundColor),
                    borderColor: data.map(item => item.borderColor),
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                size: 12
                            }
                        }
                    }
                }
            }
        });
    };

    $scope.createStoresChart = function () {
        const ctx = document.getElementById('storesChart');
        if (!ctx) return;

        const storeStats = {};
        $scope.actions.forEach(function (action) {
            if (action.type && typeof action.type === 'string' && action.type.includes('_')) {
                let parts = action.type.split('_');
                if (parts.length >= 1) {
                    let store = parts[0];
                    storeStats[store] = (storeStats[store] || 0) + 1;
                }
            }
        });

        const stores = Object.keys(storeStats).slice(0, 10); // Top 10 stores
        const data = stores.map(store => storeStats[store]);

        $scope.storesChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: stores,
                datasets: [{
                    label: 'מספר פעולות',
                    data: data,
                    backgroundColor: 'rgba(54, 162, 235, 0.8)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            font: {
                                size: 12
                            }
                        }
                    },
                    x: {
                        ticks: {
                            font: {
                                size: 10
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    };

    $scope.updateCharts = function () {
        if ($scope.actionsChart) {
            $scope.actionsChart.destroy();
        }
        if ($scope.storesChart) {
            $scope.storesChart.destroy();
        }
        
        $scope.createActionsChart();
        $scope.createStoresChart();
    };

    // Clear all filters
    $scope.clearFilters = function () {
        $scope.filters = {
            store: '',
            branch: '',
            computer: '',
            actionType: '',
            startDate: '',
            endDate: ''
        };
        $scope.applyFilters();
    };

    // Export filtered data to CSV
    $scope.exportData = function () {
        let csvContent = '';
        
        // Export leads
        csvContent += 'לידים\n';
        csvContent += 'תאריך,מזהה,איכות,סטטוס\n';
        $scope.filteredLeads.forEach(function (lead) {
            csvContent += `${lead.created_at},${lead.id},${lead.quality ? 'איכותי' : 'לא איכותי'},${$scope.getStatusText(lead.status)}\n`;
        });
        
        csvContent += '\nפעולות\n';
        csvContent += 'תאריך,סוג,חנות_סניף_מחשב\n';
        $scope.filteredActions.forEach(function (action) {
            csvContent += `${action.created_at},${$scope.getActionTypeText(action.type)},${action.store_branch_computer}\n`;
        });
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'leads_actions_data.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Process stations data for the new report
    $scope.processStationsData = function () {
        const stationsMap = new Map();
        
        // Process actions to group by store_branch_computer
        $scope.actions.forEach(function (action) {
            let storeId, branchId, computerId;
            
            // Parse the type field which contains store_branch_computer format
            if (action.type && typeof action.type === 'string' && action.type.includes('_')) {
                const parts = action.type.split('_');
                if (parts.length >= 3) {
                    storeId = parts[0];
                    branchId = parts[1];
                    computerId = parts[2];
                }
            }
            
            if (storeId && branchId && computerId) {
                const key = `${storeId}_${branchId}_${computerId}`;
                
                if (!stationsMap.has(key)) {
                    stationsMap.set(key, {
                        storeId: storeId,
                        branchId: branchId,
                        computerId: computerId,
                        mouseMoves: 0,
                        loads: 0,
                        keypresses: 0,
                        clicks: 0,
                        leads: 0
                    });
                }
                
                const station = stationsMap.get(key);
                
                // Count actions by type
                switch (action.type) {
                    case 2: // תזוזת עכבר
                        station.mouseMoves++;
                        break;
                    case 4: // טעינה
                        station.loads++;
                        break;
                    case 3: // הזנת פרטים
                        station.keypresses++;
                        break;
                    case 1: // לחיצה על פרטים
                        station.clicks++;
                        break;
                }
            }
        });
        
        // Count leads for each station
        $scope.leads.forEach(function (lead) {
            if (lead.store_branch_computer) {
                const parts = lead.store_branch_computer.split('_');
                if (parts.length >= 3) {
                    const key = `${parts[0]}_${parts[1]}_${parts[2]}`;
                    if (stationsMap.has(key)) {
                        stationsMap.get(key).leads++;
                    }
                }
            }
        });
        
        $scope.stationsData = Array.from(stationsMap.values());
        $scope.filteredStationsData = [...$scope.stationsData];
        $scope.updateStationsStatistics();
        $scope.updateStationsTable();
    };

    // Update stations statistics
    $scope.updateStationsStatistics = function () {
        const totalActions = $scope.stationsData.reduce((sum, station) => 
            sum + station.mouseMoves + station.loads + station.keypresses + station.clicks, 0);
        const totalLoads = $scope.stationsData.reduce((sum, station) => sum + station.loads, 0);
        const totalMouseMoves = $scope.stationsData.reduce((sum, station) => sum + station.mouseMoves, 0);
        const totalClicks = $scope.stationsData.reduce((sum, station) => sum + station.clicks, 0);
        const totalKeypresses = $scope.stationsData.reduce((sum, station) => sum + station.keypresses, 0);
        const uniqueStores = new Set($scope.stationsData.map(station => station.storeId)).size;
        
        // Update DOM elements
        $timeout(function () {
            const totalActionsEl = document.getElementById('totalActionsStations');
            const totalLoadsEl = document.getElementById('totalLoadsStations');
            const totalMouseMovesEl = document.getElementById('totalMouseMovesStations');
            const totalClicksEl = document.getElementById('totalClicksStations');
            const totalKeypressesEl = document.getElementById('totalKeypressesStations');
            const uniqueStoresEl = document.getElementById('uniqueStoresStations');
            
            if (totalActionsEl) totalActionsEl.textContent = totalActions;
            if (totalLoadsEl) totalLoadsEl.textContent = totalLoads;
            if (totalMouseMovesEl) totalMouseMovesEl.textContent = totalMouseMoves;
            if (totalClicksEl) totalClicksEl.textContent = totalClicks;
            if (totalKeypressesEl) totalKeypressesEl.textContent = totalKeypresses;
            if (uniqueStoresEl) uniqueStoresEl.textContent = uniqueStores;
        });
    };

    // Get unique stores for stations filter
    $scope.getUniqueStationStores = function () {
        return Array.from(new Set($scope.stationsData.map(station => station.storeId))).sort();
    };

    // Apply station filters
    $scope.applyStationFilters = function () {
        const storeFilter = document.getElementById('stationStoreFilter')?.value || '';
        const startDate = document.getElementById('stationStartDate')?.value || '';
        const endDate = document.getElementById('stationEndDate')?.value || '';
        
        $scope.filteredStationsData = $scope.stationsData.filter(station => {
            // Store filter
            if (storeFilter && station.storeId !== storeFilter) {
                return false;
            }
            
            // Date filters - we'll need to check if any action from this station falls within the date range
            if (startDate || endDate) {
                const stationActions = $scope.actions.filter(action => {
                    if (action.type && typeof action.type === 'string' && action.type.includes('_')) {
                        const parts = action.type.split('_');
                        if (parts.length >= 3) {
                            return parts[0] === station.storeId && 
                                   parts[1] === station.branchId && 
                                   parts[2] === station.computerId;
                        }
                    }
                    return false;
                });
                
                if (stationActions.length === 0) return false;
                
                if (startDate) {
                    const startDateObj = new Date(startDate);
                    const hasActionAfterStart = stationActions.some(action => 
                        new Date(action.created_at) >= startDateObj);
                    if (!hasActionAfterStart) return false;
                }
                
                if (endDate) {
                    const endDateObj = new Date(endDate);
                    endDateObj.setHours(23, 59, 59);
                    const hasActionBeforeEnd = stationActions.some(action => 
                        new Date(action.created_at) <= endDateObj);
                    if (!hasActionBeforeEnd) return false;
                }
            }
            
            return true;
        });
        
        $scope.updateStationsTable();
    };

    // Clear station filters
    $scope.clearStationFilters = function () {
        if (document.getElementById('stationStoreFilter')) {
            document.getElementById('stationStoreFilter').value = '';
        }
        if (document.getElementById('stationStartDate')) {
            document.getElementById('stationStartDate').value = '';
        }
        if (document.getElementById('stationEndDate')) {
            document.getElementById('stationEndDate').value = '';
        }
        $scope.filteredStationsData = [...$scope.stationsData];
        $scope.updateStationsTable();
    };

    // Update stations table
    $scope.updateStationsTable = function () {
        $timeout(function () {
            const tableBody = document.getElementById('stationsTableBody');
            const tableCount = document.getElementById('stationsTableCount');
            
            if (!tableBody) return;
            
            // Clear existing rows
            tableBody.innerHTML = '';
            
            // Update count
            if (tableCount) {
                tableCount.textContent = `${$scope.filteredStationsData.length} עמדות`;
            }
            
            // Add new rows
            $scope.filteredStationsData.forEach(station => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><span class="badge badge-primary">${station.storeId}</span></td>
                    <td><span class="badge badge-success">${station.branchId}</span></td>
                    <td><span class="badge badge-info">${station.computerId}</span></td>
                    <td><span class="badge badge-warning">${station.mouseMoves}</span></td>
                    <td><span class="badge badge-success">${station.loads}</span></td>
                    <td><span class="badge badge-danger">${station.keypresses}</span></td>
                    <td><span class="badge badge-info">${station.clicks}</span></td>
                    <td><span class="badge badge-secondary">${station.leads}</span></td>
                `;
                tableBody.appendChild(row);
            });
        });
    };

    // Export stations data to CSV
    $scope.exportStationsToCSV = function () {
        if ($scope.filteredStationsData.length === 0) {
            alert('אין נתונים לייצוא');
            return;
        }
        
        let csvContent = 'מזהה חנות,מזהה סניף,מזהה מחשב,תזוזות עכבר,טעינות,הזנות פרטים,לחיצות,מספר לידים\n';
        
        $scope.filteredStationsData.forEach(station => {
            csvContent += `"${station.storeId}","${station.branchId}","${station.computerId}","${station.mouseMoves}","${station.loads}","${station.keypresses}","${station.clicks}","${station.leads}"\n`;
        });
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `דוח_עמדות_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Initialize station charts
    $scope.initializeStationCharts = function () {
        $timeout(function () {
            $scope.createActionsPieChart();
            $scope.createMouseMovesChart();
        }, 500);
    };

    // Create actions pie chart
    $scope.createActionsPieChart = function () {
        const ctx = document.getElementById('actionsPieChart');
        if (!ctx) return;

        const totalLoads = $scope.stationsData.reduce((sum, station) => sum + station.loads, 0);
        const totalMouseMoves = $scope.stationsData.reduce((sum, station) => sum + station.mouseMoves, 0);
        const totalClicks = $scope.stationsData.reduce((sum, station) => sum + station.clicks, 0);
        const totalKeypresses = $scope.stationsData.reduce((sum, station) => sum + station.keypresses, 0);

        $scope.actionsPieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['טעינות', 'תזוזות עכבר', 'לחיצות', 'הזנות פרטים'],
                datasets: [{
                    data: [totalLoads, totalMouseMoves, totalClicks, totalKeypresses],
                    backgroundColor: ['#28a745', '#ffc107', '#17a2b8', '#dc3545'],
                    borderColor: ['#28a745', '#ffc107', '#17a2b8', '#dc3545'],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                size: 12
                            }
                        }
                    }
                }
            }
        });
    };

    // Create mouse moves chart
    $scope.createMouseMovesChart = function () {
        const ctx = document.getElementById('mouseMovesChart');
        if (!ctx) return;

        // Get top 10 computers with highest mouse movements
        const topComputers = $scope.stationsData
            .sort((a, b) => b.mouseMoves - a.mouseMoves)
            .slice(0, 10);

        const labels = topComputers.map(station => `${station.storeId}_${station.branchId}_${station.computerId}`);
        const data = topComputers.map(station => station.mouseMoves);

        $scope.mouseMovesChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'תזוזות עכבר',
                    data: data,
                    backgroundColor: 'rgba(255, 193, 7, 0.8)',
                    borderColor: 'rgba(255, 193, 7, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            font: {
                                size: 12
                            }
                        }
                    },
                    x: {
                        ticks: {
                            font: {
                                size: 10
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    };

    // Initialize the application
    $scope.init();
}); 