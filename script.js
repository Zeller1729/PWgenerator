<script>
    function toggleSymbolOptions() {
        const symbolFlag = document.getElementById("symbol").value;
        const options = document.getElementById("symbol-options");
        options.style.display = symbolFlag === "1" ? "block" : "none";
    }

    
    function generatePassword() {
        const numbers = '0123456789'.split('');
        const lowercase = 'abcdefghijklmnopqrstuvwxyz'.split('');
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

        const length = parseInt(document.getElementById("length").value);
        const includeSymbol = parseInt(document.getElementById("symbol").value);
        const siteName = document.getElementById("sitename").value;

        // 記号のチェックされた値だけを使用
        let selectedSymbols = [];
        if (includeSymbol) {
            document.querySelectorAll('#symbol-options input[type="checkbox"]:checked').forEach(cb => {
                selectedSymbols.push(cb.value);
            });
            if (selectedSymbols.length === 0) {
                alert("少なくとも1つの記号を選択してください。");
                return;
            }
        }

        let list = [];

        const rand = (arr, n) => Array.from({ length: n }, () => arr[Math.floor(Math.random() * arr.length)]);

        list = list.concat(rand(lowercase, Math.floor(Math.random() * ((length - 3) - Math.floor(length / 2) + 1)) + Math.floor(length / 2)));
        list = list.concat(rand(numbers, Math.floor(Math.random() * ((length - list.length - 2) + 1)) + 1));

        if (includeSymbol) {
            list = list.concat(rand(uppercase, Math.floor(Math.random() * ((length - list.length - 1) + 1)) + 1));
            list = list.concat(rand(selectedSymbols, length - list.length));
        } else {
            list = list.concat(rand(uppercase, length - list.length));
        }

        // シャッフル
        for (let i = list.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [list[i], list[j]] = [list[j], list[i]];
        }

        document.getElementById("password-label").style.display = "block";
        const password = list.join('');
        const resultElem = document.getElementById("result");
        resultElem.textContent = password + '\n\n'; 
        
        // ファイル保存リンクを追加
        const blob = new Blob([password], { type: "text/plain" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `PassWord_${siteName}.txt`;
        
        a.textContent = "パスワードをファイルに保存";
        resultElem.appendChild(document.createElement("br"));
        resultElem.appendChild(a);
    }
</script>
