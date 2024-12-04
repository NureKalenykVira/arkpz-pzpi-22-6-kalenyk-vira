// Метод Replace Type Code with Class

// Код до:

public class Task
{
	public string Title { get; set; }
	public DateTime Date { get; set; }
	public int TaskType { get; set; } // 0 - Work, 1 - Study, 2 - Personal

	public string GetTaskTypeName()
	{
		switch (TaskType)
		{
			case 0: return "Work";
			case 1: return "Study";
			case 2: return "Personal";
			default: return "Unknown";
		}
	}
}

var task = new Task
{
	Title = "Complete project",
	Date = DateTime.Now,
	TaskType = 0 
};
Console.WriteLine($"Task: {task.Title}, Type: {task.GetTaskTypeName()}");


// Код після рефакторингу:

public class TaskType
{
	public string Name { get; }
	private TaskType(string name)
	{
		Name = name;
	}

	public static readonly TaskType Work = new TaskType("Work");
	public static readonly TaskType Study = new TaskType("Study");
	public static readonly TaskType Personal = new TaskType("Personal");

	public override string ToString() => Name;
}

public class Task
{
	public string Title { get; set; }
	public DateTime Date { get; set; }
	public TaskType Type { get; set; }
}

var task = new Task
{
	Title = "Complete project",
	Date = DateTime.Now,
	Type = TaskType.Work // Замість числового коду
};
Console.WriteLine($"Task: {task.Title}, Type: {task.Type}");



// Метод Substitute Algorithm

// Код до:

public class Task
{
	public string Title { get; set; }
	public DateTime DueDate { get; set; }
}

public class TaskPlanner
{
	public List<Task> SortTasksByDate(List<Task> tasks)
	{
		for (int i = 0; i < tasks.Count; i++)
		{
			for (int j = i + 1; j < tasks.Count; j++)
			{
				if (tasks[i].DueDate > tasks[j].DueDate)
				{
					var temp = tasks[i];
					tasks[i] = tasks[j];
					tasks[j] = temp;
				}
			}
		}
		return tasks;
	}
}

// Код після рефакторингу:

public class TaskPlanner
{
	public List<Task> SortTasksByDate(List<Task> tasks)
	{
		return tasks.OrderBy(t => t.DueDate).ToList();
	}
}



// Метод Tease Apart Inheritance

// Код до:

public class Task
{
	public string Title { get; set; }
}

public class ListTask : Task
{
	public void RenderAsList()
	{
		Console.WriteLine($"Task in list: {Title}");
	}
}

public class CalendarTask : Task
{
	public DateTime DueDate { get; set; }

	public void RenderInCalendar()
	{
		Console.WriteLine($"Task in calendar: {Title} on {DueDate}");
	}
}

public class ListEvent : ListTask
{
	public DateTime EventDate { get; set; }

	public void RenderEventAsList()
	{
		Console.WriteLine($"Event in list: {Title} on {EventDate}");
	}
}

public class CalendarEvent : CalendarTask
{
	public DateTime EventDate { get; set; }

	public void RenderEventInCalendar()
	{
		Console.WriteLine($"Event in calendar: {Title} on {EventDate}");
	}
}


// Код після рефакторингу:

public class Task
{
	public string Title { get; set; }
}

public class Event : Task
{
	public DateTime EventDate { get; set; }
}

public interface IRenderer
{
	void Render(Task task);
}

public class ListRenderer : IRenderer
{
	public void Render(Task task)
	{
		if (task is Event eventTask)
		{
			Console.WriteLine($"Event in list: {eventTask.Title} on {eventTask.EventDate}");
		}
		else
		{
			Console.WriteLine($"Task in list: {task.Title}");
		}
	}
}

public class CalendarRenderer : IRenderer
{
	public void Render(Task task)
	{
		if (task is Event eventTask)
		{
			Console.WriteLine($"Event in calendar: {eventTask.Title} on {eventTask.EventDate}");
		}
		else
		{
			Console.WriteLine($"Task in calendar: {task.Title}");
		}
	}
}

var task = new Task { Title = "Buy groceries" };
var eventTask = new Event { Title = "Team meeting", EventDate = DateTime.Now };

IRenderer listRenderer = new ListRenderer();
listRenderer.Render(task);
listRenderer.Render(eventTask);

IRenderer calendarRenderer = new CalendarRenderer();
calendarRenderer.Render(task);
calendarRenderer.Render(eventTask);

