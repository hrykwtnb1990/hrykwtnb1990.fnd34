'usestrict'

document.getElementById('improvementForm').addEventListener('submit', function(event) {
    const employeeCodeInput = document.getElementById('employee_code');
    const employeeCode = employeeCodeInput.value;
    const errorDiv = document.getElementById('employee_code-error');



        // フォームデータの取得
        const formData = new FormData(this);
        const formDataArray = [];

        for (let [key, value] of formData.entries()) {
            formDataArray.push({
                key: key,
                value: value
            });
        }

        // IndexedDBへの格納
        const request = indexedDB.open('improvementDB', 1);

        request.onerror = function(event) {
            console.error('データ送信に失敗しました。');
        };

        request.onupgradeneeded = function(event) {
            const db = event.target.result;
            const objectStore = db.createObjectStore('improvements', {
                autoIncrement: true
            });
        };

        request.onsuccess = function(event) {
            const db = event.target.result;
            const transaction = db.transaction(['improvements'], 'readwrite');
            const objectStore = transaction.objectStore('improvements');
            const addRequest = objectStore.add(formDataArray);

            addRequest.onerror = function(event) {
                console.error('IndexedDBへの格納に失敗しました。');
            };

            addRequest.onsuccess = function(event) {
                console.log('IndexedDBへの格納が完了しました。');
                alert('提案内容が送信されました。')
                document.getElementById('improvementForm').reset();
            };
        };
    }
);
