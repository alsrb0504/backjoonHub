#include <iostream>
#include <string>
using namespace std;

int i, j;

int main()
{
	string s;

	getline(cin, s);

	int count = 0;

	int length = s.size();	//배열 길이

	if (s[0] == ' ')	//시작에 공백이 꼈다면.
	{
		//맨 뒤에 공백이 없다면
		if (s[length - 1] != ' ')
		{
			for (i = 0; i < length; i++)
			{
				if (s[i] == ' ')
					count++;
			}
		}
		//맨 뒤에 공백이 있다면
		if (s[length - 1] == ' ')	//else로 바꿔보기!!!
		{
			for (i = 1; i < length; i++)
			{
				if (s[i] == ' ')
					count++;
			}
		}
	}
	//시작이 공백이 아니라면.
	else
	{
		//맨 뒤에 공백이 없다면
		if (s[length - 1] != ' ')
		{
			for (i = 0; i < length; i++)
			{
				if (s[i] == ' ')
					count++;
			}
			count++;	//추가
		}
		//맨 뒤에 공백이 있다면
		if (s[length - 1] == ' ')	//else로 바꿔보기!!!
		{
			for (i = 1; i < length; i++)
			{
				if (s[i] == ' ')
					count++;
			}
		}
	}


	cout << count << "\n";

	return 0;
}