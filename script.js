document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const modalSearchInput = document.getElementById('modalSearchInput');
    const searchModal = document.getElementById('searchModal');
    const hotSearchesContainer = document.getElementById('hotSearches');
    const resultsList = document.getElementById('resultsList');
    const clearButton = document.getElementById('clearButton');
    const modalClearButton = document.getElementById('modalClearButton');
    const searchButton = document.getElementById('searchButton');
    const modalSearchButton = document.getElementById('modalSearchButton');
    const backButton = document.querySelector('.back-button');

    // 初始化热门搜索
    function initHotSearches() {
        hotSearches.forEach(term => {
            const item = document.createElement('div');
            item.className = 'hot-search-item';
            item.textContent = term;
            item.addEventListener('click', () => {
                syncSearchInputs(term);
                searchModal.style.display = 'none';
                performSearch(term);
            });
            hotSearchesContainer.appendChild(item);
        });
    }

    // 搜索功能
    function performSearch(query) {
        const results = musicSheetData.filter(item => {
            const searchStr = query.toLowerCase();
            return item.title.toLowerCase().includes(searchStr) ||
                   item.type.toLowerCase().includes(searchStr) ||
                   item.description.toLowerCase().includes(searchStr);
        });
        displayResults(results);
    }

    // 显示搜索结果
    function displayResults(results) {
        resultsList.innerHTML = '';
        results.forEach(item => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.style.cursor = 'pointer';
            resultItem.innerHTML = `
                <div class="result-title">${item.title}</div>
                <div class="result-description">${item.description}</div>
            `;
            // 添加点击事件
            resultItem.addEventListener('click', () => {
                if (item.url) {
                    window.open(item.url, '_blank');
                }
            });
            resultsList.appendChild(resultItem);
        });
    }

    // 更新清除按钮显示状态
    function updateClearButton() {
        clearButton.style.display = searchInput.value ? 'block' : 'none';
    }

    // 同步两个搜索框的内容
    function syncSearchInputs(value) {
        searchInput.value = value;
        modalSearchInput.value = value;
        updateClearButton();
        updateModalClearButton();
    }

    // 更新模态框清除按钮显示状态
    function updateModalClearButton() {
        modalClearButton.style.display = modalSearchInput.value ? 'block' : 'none';
    }

    // 事件监听
    searchInput.addEventListener('focus', () => {
        searchModal.style.display = 'block';
        modalSearchInput.value = searchInput.value;
        updateModalClearButton();
        // 聚焦到模态框的搜索输入框
        setTimeout(() => modalSearchInput.focus(), 100);
    });

    searchInput.addEventListener('input', (e) => {
        performSearch(e.target.value);
        updateClearButton();
    });

    clearButton.addEventListener('click', () => {
        searchInput.value = '';
        updateClearButton();
        displayResults(musicSheetData);
    });

    // 添加返回按钮事件监听
    backButton.addEventListener('click', () => {
        searchModal.style.display = 'none';
    });

    // 修改模态框点击事件，只在点击返回按钮时关闭
    searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) {
            searchModal.style.display = 'none';
        }
    });

    // 添加模态框搜索框事件监听
    modalSearchInput.addEventListener('input', (e) => {
        const value = e.target.value;
        syncSearchInputs(value);
        performSearch(value);
    });

    modalClearButton.addEventListener('click', () => {
        syncSearchInputs('');
        displayResults(musicSheetData);
    });

    // 执行搜索
    function executeSearch() {
        const value = searchInput.value.trim();
        if (value) {
            performSearch(value);
        }
    }

    // 添加搜索按钮事件监听
    searchButton.addEventListener('click', executeSearch);
    modalSearchButton.addEventListener('click', () => {
        executeSearch();
        searchModal.style.display = 'none';
    });

    // 添加回车键搜索
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            executeSearch();
        }
    });

    modalSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            executeSearch();
            searchModal.style.display = 'none';
        }
    });

    // 初始化
    initHotSearches();
    displayResults(musicSheetData);
}); 